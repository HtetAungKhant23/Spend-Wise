import { ApiProperty } from '@nestjs/swagger';
import { ACCOUNT_TYPE } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccountDto {
  @ApiProperty({ type: String, example: 'KBZPay' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ACCOUNT_TYPE, example: ACCOUNT_TYPE.WALLET })
  @IsNotEmpty()
  type: ACCOUNT_TYPE;

  @ApiProperty({ type: Number, example: 200000 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
