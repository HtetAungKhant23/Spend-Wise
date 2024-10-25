import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE, TRANSACTION_TYPE } from '@prisma/client';

export class TransactionsEntity {
  id: string;

  remark: string;

  description: string;

  image: string | null;

  amount: number;

  type: TRANSACTION_TYPE;

  from: IAccount | null;

  to: IAccount | null;

  category: ICategory | null;

  createdAt: Date;

  constructor(
    id: string,
    remark: string,
    description: string,
    image: string | null,
    amount: number,
    type: TRANSACTION_TYPE,
    from: IAccount | null,
    to: IAccount | null,
    category: ICategory | null,
    createdAt: Date,
  ) {
    this.id = id;
    this.remark = remark;
    this.description = description;
    this.image = image;
    this.amount = amount;
    this.type = type;
    this.from = from;
    this.to = to;
    this.category = category;
    this.createdAt = createdAt;
  }
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
  isPrivate: boolean;
};
