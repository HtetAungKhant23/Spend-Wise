import { TRANSACTION_TYPE } from '@prisma/client';

export class TransactionsEntity {
  id: string;

  remark: string;

  image: string | null;

  amount: number;

  type: TRANSACTION_TYPE;

  category: ICategory | null;

  createdAt: Date;

  constructor(
    id: string,
    remark: string,
    image: string | null,
    amount: number,
    type: TRANSACTION_TYPE,
    category: ICategory | null,
    createdAt: Date,
  ) {
    this.id = id;
    this.remark = remark;
    this.image = image;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.createdAt = createdAt;
  }
}

type ICategory = {
  id: string;
  name: string;
  icon: string | null;
};
