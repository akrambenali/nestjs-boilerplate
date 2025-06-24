import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { OrderStatusEntity } from '../../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';
import { PaymentStatusEntity } from '../../../../../payment-statuses/infrastructure/persistence/relational/entities/payment-status.entity';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @ManyToOne(() => UserEntity, { eager: true })
  user?: UserEntity | null;

  @ManyToOne(() => PaymentStatusEntity, { eager: true })
  paymentStatus?: PaymentStatusEntity | null;

  @Column({
    nullable: false,
    type: Number,
  })
  totalAmount: number;

  @ManyToOne(() => OrderStatusEntity, { eager: true })
  status?: OrderStatusEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
