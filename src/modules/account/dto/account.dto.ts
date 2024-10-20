import { ApiProperty } from '@nestjs/swagger';
import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccountDto {
  @ApiProperty({ type: String, example: 'KBZPay' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ACCOUNT_TYPE, example: ACCOUNT_TYPE.WALLET })
  @IsNotEmpty()
  type: ACCOUNT_TYPE;

  @ApiProperty({ enum: SUB_ACCOUNT_TYPE, example: SUB_ACCOUNT_TYPE.WALLET })
  @IsNotEmpty()
  subType: SUB_ACCOUNT_TYPE;

  @ApiProperty({ type: Number, example: 200000 })
  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
