import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE, TRANSACTION_TYPE } from '@prisma/client';

export class TransactionEntity {
  id: string;

  remark: string;

  description: string | null;

  image: string | null;

  amount: number;

  type: TRANSACTION_TYPE;

  account: IAccount;

  category: ICategory | null;
}

type IAccount = {
  id: string;
  name: string;
  type: ACCOUNT_TYPE;
  subType: SUB_ACCOUNT_TYPE;
};

type ICategory = {
  id: string;
  name: string;
  icon: string | null;
};
