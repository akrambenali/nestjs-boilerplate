import { OrderStatusDto } from '../../order-statuses/dto/order-status.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsNumber,
  IsOptional,
  IsString,
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

export class CreateOrderDto {
  @ApiProperty({
    required: false,
    type: () => OrderStatusDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrderStatusDto)
  @IsNotEmptyObject()
  status?: OrderStatusDto | null;

  @ApiProperty({
    required: false,
    type: () => UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user?: UserDto | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  adresse?: string | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  totalAmount?: number | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
