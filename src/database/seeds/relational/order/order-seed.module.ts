import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../../../orders/infrastructure/persistence/relational/entities/order.entity';
import { OrderSeedService } from './order-seed.service';
import { OrderFactory } from './order.factory';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderSeedService, OrderFactory],
  exports: [OrderSeedService, OrderFactory],
})
export class OrderSeedModule {}
