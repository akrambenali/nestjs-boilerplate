import { OrderDto } from '../../orders/dto/order.dto';

import {
  // decorators here

  IsNumber,
  IsDate,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here

  Transform,
  Type,
} from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({
    required: true,
    type: () => OrderDto,
  })
  @ValidateNested()
  @Type(() => OrderDto)
  @IsNotEmptyObject()
  order: OrderDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  method: number;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  paymentDate: Date;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  amount: number;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
