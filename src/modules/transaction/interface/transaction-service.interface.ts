import { IPagination } from '@app/core/decorators/pagination.decorator';
import { PaginationResponse } from '@app/core/interfaces/response.interface';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionsEntity } from '../entity/transactions.entity';

export interface ITransactionService {
  create(dto: TransactionDto, url: any, userId: string): Promise<void>;
  get(userId: string, { limit, offset }: IPagination): Promise<PaginationResponse<TransactionsEntity>>;
}
