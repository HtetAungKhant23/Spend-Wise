import { ApiProperty } from '@nestjs/swagger';
import { TRANSACTION_TYPE } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  remark: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number })
  amount: number;

  type: TRANSACTION_TYPE;

  accountId: string;

  categoryId: string;
}
