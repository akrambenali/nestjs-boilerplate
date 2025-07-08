import { OrderStatusEntity } from '../../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';

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

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @ManyToOne(() => OrderStatusEntity, { eager: true })
  status?: OrderStatusEntity | null;

  @ManyToOne(() => UserEntity, { eager: true })
  user?: UserEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  adresse?: string | null;

  @Column({
    nullable: true,
    type: Number,
  })
  totalAmount?: number | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
