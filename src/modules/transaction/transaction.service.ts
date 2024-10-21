import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService implements ITransactionService {
  constructor(private readonly dbService: PrismaService) {}

  async create(dto: TransactionDto): Promise<void> {
    console.log(dto);
  }

  async get(userId: string): Promise<TransactionEntity> {
    console.log(userId);
    return new TransactionEntity();
  }
}
