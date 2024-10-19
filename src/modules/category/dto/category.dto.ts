import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  icon?: string;

  @ApiProperty({ required: true, example: false })
  @IsNotEmpty()
  @IsBoolean()
  private: boolean;
}
