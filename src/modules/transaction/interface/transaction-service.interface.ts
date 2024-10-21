import { TransactionDto } from '../dto/transaction.dto';
import { TransactionEntity } from '../entity/transaction.entity';

export interface ITransactionService {
  create(dto: TransactionDto): Promise<void>;
  get(userId: string): Promise<TransactionEntity>;
}
