import { OrderStatus } from '../../order-statuses/domain/order-status';
import { PaymentStatus } from '../../payment-statuses/domain/payment-status';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    type: () => User,
  })
  user?: User | null;

  @ApiProperty({
    type: () => PaymentStatus,
  })
  paymentStatus?: PaymentStatus | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  totalAmount: number;

  @ApiProperty({
    type: () => OrderStatus,
  })
  status?: OrderStatus | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
