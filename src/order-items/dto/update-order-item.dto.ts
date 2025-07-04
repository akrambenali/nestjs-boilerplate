import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiPropertyOptional({ example: 100, type: Number })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @ApiPropertyOptional({ example: 100, type: Number })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
