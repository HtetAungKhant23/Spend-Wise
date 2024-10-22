import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { IAccountService } from './interface/account-service.interface';
import { AccountDto } from './dto/account.dto';
import { AccountEntity } from './entity/account.entity';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly dbService: PrismaService) {}

  async create(userId: string, dto: AccountDto): Promise<any> {
    const existAccount = await this.dbService.account.findFirst({
      where: {
        subType: dto.subType,
        userId,
        isDeleted: false,
      },
    });

    if (existAccount) {
      throw new BadRequestException({
        message: `Account already exist`,
        code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
      });
    }

    const account = await this.dbService.account.create({
      data: {
        name: dto.name,
        type: dto.type,
        subType: dto.subType,
        balance: dto.balance,
        userId,
      },
    });

    await this.dbService.transaction.create({
      data: {
        remark: 'account create transaction',
        description: 'account create transaction',
        amount: dto.balance,
        type: 'INCOME',
        accountId: account.id,
      },
    });
  }

  async get(userId: string): Promise<AccountEntity[]> {
    const accounts = await this.dbService.account.findMany({
      where: {
        userId,
        isDeleted: false,
      },
    });

    return accounts.map((account) => {
      return new AccountEntity(account.id, account.name, account.type, account.subType, account.balance);
    });
  }

  async edit(id: string, name: string): Promise<void> {
    await this.dbService.account.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        name,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.dbService.account.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
