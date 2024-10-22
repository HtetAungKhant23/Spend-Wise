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
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: TRANSACTION_TYPE, example: TRANSACTION_TYPE.INCOME })
  @IsNotEmpty()
  type: TRANSACTION_TYPE;

  @ApiProperty({ required: false })
  @IsOptional()
  from?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  to?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsOptional()
  image?: any;
}
