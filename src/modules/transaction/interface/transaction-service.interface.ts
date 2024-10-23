import { TransactionDto } from '../dto/transaction.dto';

export interface ITransactionService {
  create(dto: TransactionDto, url: any, userId: string): Promise<void>;
  get(userId: string): Promise<any>;
}
