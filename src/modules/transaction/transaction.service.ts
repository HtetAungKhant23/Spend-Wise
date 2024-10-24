import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly dbService: PrismaService) {}

  async create(dto: TransactionDto, url: any, userId: string): Promise<void> {
    try {
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

  async get(userId: string): Promise<any> {
    const transactions = await this.dbService.transaction.findMany({
      where: {
        OR: [
          {
            type: 'EXPENSE',
            fromAccount: {
              isDeleted: false,
            },
          },
          {
            type: 'INCOME',
            toAccount: {
              isDeleted: false,
            },
          },
        ],
        userId,
      },
      include: {
        fromAccount: {
          include: {
            fromTransactions: {
              include: {
                category: true,
              },
            },
            toTransactions: {
              include: {
                category: true,
              },
            },
          },
        },
        toAccount: {
          include: {
            fromTransactions: {
              include: {
                category: true,
              },
            },
            toTransactions: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return transactions;

    // const result = [];

    // for (let i = 0; i < transactions.length; i += 1) {
    //   const transaction = transactions[i];
    //   for (let j = 0; j < transaction?.fromAccount?.fromTransactions?.length; j += 1) {
    //     const fromTran = transactions.fromTransactions[i];
    //     const cate = fromTran?.category
    //       ? {
    //           id: fromTran?.category.id,
    //           name: fromTran?.category.name,
    //           icon: fromTran?.category?.icon,
    //         }
    //       : null;
    //     transactions.push({
    //       id: fromTran?.id || '',
    //       remark: fromTran?.remark || '',
    //       amount: fromTran?.amount || 0,
    //       type: fromTran?.type || 'INCOME',
    //       createdAt: fromTran?.createdAt || new Date(),
    //       category: cate,
    //     });
    //   }
    // }

    // for (let i = 0; i < account.toTransactions.length; i += 1) {
    //   const toTran = account.toTransactions[i];
    //   const cate = toTran?.category
    //     ? {
    //         id: toTran?.category.id,
    //         name: toTran?.category.name,
    //         icon: toTran?.category?.icon,
    //       }
    //     : null;
    //   transactions.push({
    //     id: toTran?.id || '',
    //     remark: toTran?.remark || '',
    //     amount: toTran?.amount || 0,
    //     type: toTran?.type || 'INCOME',
    //     createdAt: toTran?.createdAt || new Date(),
    //     category: cate,
    //   });
    // }

    // return new TransactionEntity();
  }
}
