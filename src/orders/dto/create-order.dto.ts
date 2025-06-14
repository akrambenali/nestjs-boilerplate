import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here

  IsString,
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
    type: () => String,
  })
  @IsString()
  paymentStatus: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  status: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
