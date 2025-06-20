import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ example: 'Omo', type: String })
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '100', type: Number })
  @IsOptional()
  stock?: number;

  @ApiPropertyOptional({ example: '100', type: Number })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 'Kg', type: String })
  @IsOptional()
  unit?: string;

  @ApiPropertyOptional({ type: () => StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;
}
