import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  stock: number;

  @Column({
    nullable: false,
    type: String,
  })
  unit: string;

  @Column({
    nullable: false,
    type: Number,
  })
  price: number;

  @Column({
    nullable: false,
    type: String,
  })
  description: string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
