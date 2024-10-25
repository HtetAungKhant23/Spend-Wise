import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { Prisma } from '@prisma/client';
import { PaginationResponse } from '@app/core/interfaces/response.interface';
import { IPagination } from '@app/core/decorators/pagination.decorator';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsEntity } from './entity/transactions.entity';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly dbService: PrismaService) {}

  async create(dto: TransactionDto, url: any, userId: string): Promise<void> {
    try {
      if (dto?.from) {
        const enough = await this.checkEnoughBalance(dto.from, +dto.amount);
        if (!enough) {
          throw new BadRequestException({
            message: `Insufficient balance`,
            code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
          });
        }
      }

      await this.dbService.transaction.create({
        data: {
          remark: dto.remark,
          description: dto?.description,
          amount: +dto.amount,
          image: url,
          type: dto.type,
          userId,
          fromId: dto?.from,
          toId: dto?.to,
          categoryId: dto?.categoryId,
        },
      });

      if (dto.type === 'TRANSFER') {
        await this.dbService.account.update({
          where: {
            id: dto.from,
          },
          data: {
            balance: {
              decrement: +dto.amount,
            },
          },
        });
        await this.dbService.account.update({
          where: {
            id: dto.to,
          },
          data: {
            balance: {
              increment: +dto.amount,
            },
          },
        });
      } else {
        await this.dbService.account.update({
          where: {
            id: dto?.from || dto?.to,
          },
          data: {
            balance: {
              ...(dto.type === 'INCOME' ? { increment: +dto.amount } : { decrement: +dto.amount }),
            },
          },
        });
      }
    } catch (err) {
      throw new BadRequestException({
        message: err?.message,
        code: ExceptionConstants.BadRequestCodes.INVALID_INPUT,
      });
    }
  }

  async get(userId: string, { limit, offset }: IPagination): Promise<PaginationResponse<TransactionsEntity>> {
    const rawTransactions = `
        SELECT
            tr.id,
            tr.remark,
            tr.image,
            tr.amount,
            tr.type,
            cate.id AS "categoryId",
            cate.name,
            cate.icon,
            cate.is_private,
            facc.id AS "fromId",
            facc.name AS "fromName",
            facc.type AS "fromType",
            facc."subType" AS "fromSubType",
            tacc.id AS "toId",
            tacc.name AS "toName",
            tacc.type AS "toType",
            tacc."subType" AS "toSubType",
            tr.created_at
        FROM transactions tr
            LEFT JOIN categories cate ON cate.id = tr.category_id
            LEFT JOIN accounts facc ON facc.id = tr.from_id
            LEFT JOIN accounts tacc ON tacc.id = tr.to_id
        WHERE tr.user_id = '${userId}'
        ORDER BY created_at DESC
        LIMIT '${limit}' OFFSET '${offset}';
      `;

    const rawTotalCount = `
      SELECT
          coalesce(cast(count(*) AS INTEGER), 0) AS "totalCounts"
      FROM transactions tr
          LEFT JOIN categories cate ON cate.id = tr.category_id
      WHERE tr.user_id = '${userId}';
    `;

    const transactions: any[] = await this.dbService.$queryRaw(Prisma.sql([rawTransactions]));
    const total: any = await this.dbService.$queryRaw(Prisma.sql([rawTotalCount]));

    return {
      result: transactions?.map((transaction) => {
        return new TransactionsEntity(
          transaction.id,
          transaction.remark,
          transaction.image,
          transaction.amount,
          transaction.type,
          transaction?.fromId && {
            id: transaction.fromId,
            name: transaction.fromName,
            type: transaction.fromType,
            subType: transaction.fromSubType,
          },
          transaction?.toId && {
            id: transaction.toId,
            name: transaction.toName,
            type: transaction.toType,
            subType: transaction.toSubType,
          },
          transaction?.categoryId && {
            id: transaction.categoryId,
            name: transaction.name,
            icon: transaction.icon,
            isPrivate: transaction.is_private,
          },
          transaction.created_at,
        );
      }),
      total: +total[0].totalCounts.toString(),
    };
  }

  private async checkEnoughBalance(accountId: string, amount: number): Promise<boolean> {
    const account = await this.dbService.account.findUnique({
      where: {
        id: accountId,
        isDeleted: false,
        balance: {
          gte: amount,
        },
      },
    });

    return !!account;
  }
}
