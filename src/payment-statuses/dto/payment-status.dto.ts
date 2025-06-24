import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaymentStatusDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
