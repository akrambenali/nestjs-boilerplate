import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusEntity } from '../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';
import { OrderStatusSeedService } from './order-status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusEntity])],
  providers: [OrderStatusSeedService],
  exports: [OrderStatusSeedService],
})
export class OrderStatusSeedModule {}
