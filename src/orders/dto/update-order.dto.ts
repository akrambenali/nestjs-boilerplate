// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';
import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { OrderStatusDto } from '../../order-statuses/dto/order-status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { CreateOrderDto } from './create-order.dto';
import { UserDto } from '../../users/dto/user.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ example: 'kouba Alger', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsString()
  adresse?: string;

  @ApiPropertyOptional({ example: '10000', type: Number })
  @IsOptional()
  totalAmount?: number;

  @ApiPropertyOptional({ type: () => UserDto })
  @IsOptional()
  @Type(() => UserDto)
  user?: UserDto;

  @ApiPropertyOptional({ type: () => OrderStatusDto })
  @IsOptional()
  @Type(() => OrderStatusDto)
  status?: OrderStatusDto;
}
