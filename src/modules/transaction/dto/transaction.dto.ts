import { ApiProperty } from '@nestjs/swagger';
import { TRANSACTION_TYPE } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  remark: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: TRANSACTION_TYPE, example: TRANSACTION_TYPE.INCOME })
  @IsNotEmpty()
  type: TRANSACTION_TYPE;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
