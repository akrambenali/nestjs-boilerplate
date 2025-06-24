import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Order } from '../domain/order';
import { PaymentStatusDto } from '../../payment-statuses/dto/payment-status.dto';
import { OrderStatusDto } from '../../order-statuses/dto/order-status.dto';

export class FilterOrderDto {
  @ApiPropertyOptional({ type: PaymentStatusDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PaymentStatusDto)
  paymentStatus?: PaymentStatusDto[] | null;

  @ApiPropertyOptional({ type: OrderStatusDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderStatusDto)
  status?: OrderStatusDto[] | null;
}

export class SortOrderDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Order;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryOrdersDto {
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
    value ? plainToInstance(FilterOrderDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterOrderDto)
  filters?: FilterOrderDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortOrderDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortOrderDto)
  sort?: SortOrderDto[] | null;
}
