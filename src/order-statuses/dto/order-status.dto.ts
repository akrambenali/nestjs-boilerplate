import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class OrderStatusDto {
  @ApiProperty()
  @IsNumber()
  id: number | string;
}
