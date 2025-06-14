import { Order } from '../../orders/domain/order';
import { ApiProperty } from '@nestjs/swagger';

export class Payment {
  @ApiProperty({
    type: () => Order,
    nullable: false,
  })
  order: Order;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  method: number;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  paymentDate: Date;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  amount: number;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
