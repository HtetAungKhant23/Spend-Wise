import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly dbService: PrismaService) {}

  async create(dto: TransactionDto, url: any): Promise<void> {
    try {
      await this.dbService.transaction.create({
        data: {
          remark: dto.remark,
          description: dto?.description,
          amount: +dto.amount,
          image: url,
          type: dto.type,
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

  async get(userId: string): Promise<TransactionEntity> {
    console.log(userId);
    return new TransactionEntity();
  }
}
