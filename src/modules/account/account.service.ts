import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { IAccountService } from './interface/account-service.interface';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly dbService: PrismaService) {}

  async create(userId: string, dto: AccountDto): Promise<void> {
    const account = await this.dbService.account.create({
      data: {
        name: dto.name,
        type: dto.type,
        amount: dto.amount,
        userId,
      },
    });

    await this.dbService.transaction.create({
      data: {
        remark: 'account create transaction',
        description: 'account create transaction',
        amount: dto.amount,
        type: 'INCOME',
        accountId: account.id,
      },
    });
  }

  async get(userId: string): Promise<any> {
    return userId;
  }
}
