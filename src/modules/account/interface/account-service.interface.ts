import { AccountDto } from '../dto/account.dto';
import { AccountEntity } from '../entity/account.entity';

export interface IAccountService {
  create(userId: string, dto: AccountDto): Promise<void>;
  get(userId: string): Promise<AccountEntity[]>;
  // getDetail(userId: string, id: string): Promise<AccountEntity>;
  edit(id: string, name: string): Promise<void>;
  delete(id: string): Promise<void>;
}
