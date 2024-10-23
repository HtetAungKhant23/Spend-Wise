import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE, TRANSACTION_TYPE } from '@prisma/client';

export class AccountEntity {
  id: string;

  name: string;

  type: ACCOUNT_TYPE;

  subType: SUB_ACCOUNT_TYPE;

  balance: number;

  transactions?: ITransaction[];

  constructor(id: string, name: string, type: ACCOUNT_TYPE, subType: SUB_ACCOUNT_TYPE, balance: number, transactions?: ITransaction[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.subType = subType;
    this.balance = balance;
    this.transactions = transactions;
  }
}

export type ITransaction = {
  id: string;
  remark: string;
  amount: number;
  type: TRANSACTION_TYPE;
  category: ICategory | null;
  createdAt: Date;
};

type ICategory = {
  id: string;
  name: string;
  icon: string | null;
};
