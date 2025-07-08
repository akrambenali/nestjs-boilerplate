import { OrderStatus } from '../../order-statuses/domain/order-status';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    type: () => OrderStatus,
    nullable: true,
  })
  status?: OrderStatus | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  adresse?: string | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  totalAmount?: number | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
