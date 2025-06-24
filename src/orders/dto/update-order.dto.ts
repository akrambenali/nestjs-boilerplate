// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsOptional } from 'class-validator';
import { PaymentStatusDto } from '../../payment-statuses/dto/payment-status.dto';
import { OrderStatusDto } from '../../order-statuses/dto/order-status.dto';
import { Type } from 'class-transformer';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ type: () => PaymentStatusDto })
  @IsOptional()
  @Type(() => PaymentStatusDto)
  paymentStatus?: PaymentStatusDto;

  @ApiPropertyOptional({ type: () => OrderStatusDto })
  @IsOptional()
  @Type(() => OrderStatusDto)
  status?: OrderStatusDto;
}
