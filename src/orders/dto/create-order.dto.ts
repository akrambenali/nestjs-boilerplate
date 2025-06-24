import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsNumber,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';
import { OrderStatus } from '../../order-statuses/domain/order-status';
import { PaymentStatus } from '../../payment-statuses/domain/payment-status';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: () => UserDto,
  })
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user: UserDto;

  @ApiProperty({
    required: true,
    type: () => PaymentStatus,
  })
  @IsNumber()
  paymentStatus: PaymentStatus;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    required: true,
    type: () => OrderStatus,
  })
  @IsNumber()
  status: OrderStatus;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
