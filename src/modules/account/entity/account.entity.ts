import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE } from '@prisma/client';

export class AccountEntity {
  id: string;

  name: string;

  type: ACCOUNT_TYPE;

  subType: SUB_ACCOUNT_TYPE;

  balance: number;

  constructor(id: string, name: string, type: ACCOUNT_TYPE, subType: SUB_ACCOUNT_TYPE, balance: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.subType = subType;
    this.balance = balance;
  }
}
