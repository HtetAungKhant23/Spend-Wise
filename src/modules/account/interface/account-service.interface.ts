import { AccountDto } from '../dto/account.dto';

export interface IAccountService {
  create(userId: string, dto: AccountDto): Promise<void>;
  get(userId: string): Promise<any>;
}
