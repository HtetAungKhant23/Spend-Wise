import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditAccountDto {
  @ApiProperty({ type: String, example: 'KBZPay' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
