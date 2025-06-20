import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../../statuses/domain/status';

export class Product {
  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  unit: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  description: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
