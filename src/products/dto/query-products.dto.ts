import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { StatusDto } from '../../statuses/dto/status.dto';
import { Product } from '../domain/product';

export class FilterProductDto {
  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => StatusDto)
  status?: StatusDto[] | null;

  @IsOptional()
  @IsString()
  search?: string;
}

export class SortProductDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Product;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryProductsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterProductDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterProductDto)
  filters?: FilterProductDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortProductDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortProductDto)
  sort?: SortProductDto[] | null;
}
