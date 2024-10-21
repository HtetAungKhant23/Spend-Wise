import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE, TRANSACTION_TYPE } from '@prisma/client';

export class TransactionEntity {
  id: string;

  remark: string;

  description?: string;

  image?: string;

  amount: number;

  type: TRANSACTION_TYPE;

  account: IAccount;

  category: ICategory;
}

type IAccount = {
  name: string;
  type: ACCOUNT_TYPE;
  subType: SUB_ACCOUNT_TYPE;
};

type ICategory = {
  name: string;
  icon: string;
};
