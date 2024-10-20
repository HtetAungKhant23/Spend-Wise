import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE } from '@prisma/client';

export class AccountEntity {
  name: string;

  type: ACCOUNT_TYPE;

  subType: SUB_ACCOUNT_TYPE;

  balance: number;

  constructor(name: string, type: ACCOUNT_TYPE, subType: SUB_ACCOUNT_TYPE, balance: number) {
    this.name = name;
    this.type = type;
    this.subType = subType;
    this.balance = balance;
  }
}
