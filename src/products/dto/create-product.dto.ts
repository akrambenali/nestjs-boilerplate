import {
  // decorators here

  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { StatusDto } from '../../statuses/dto/status.dto';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  unit: string;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
