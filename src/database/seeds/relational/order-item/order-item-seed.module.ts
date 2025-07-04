import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from '../../../../order-items/infrastructure/persistence/relational/entities/order-item.entity';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { OrderEntity } from '../../../../orders/infrastructure/persistence/relational/entities/order.entity';
import { OrderItemSeedService } from './order-item-seed.service';
import { OrderItemFactory } from './order-item.factory';
import { ProductRepository } from '../../../../products/infrastructure/persistence/product.repository';
import { OrderRepository } from '../../../../orders/infrastructure/persistence/order.repository';
import { ProductsRelationalRepository } from '../../../../products/infrastructure/persistence/relational/repositories/product.repository';
import { OrderRelationalRepository } from '../../../../orders/infrastructure/persistence/relational/repositories/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity, ProductEntity, OrderEntity]),
  ],
  providers: [
    OrderItemSeedService,
    OrderItemFactory,
    {
      provide: ProductRepository,
      useClass: ProductsRelationalRepository,
    },
    {
      provide: OrderRepository,
      useClass: OrderRelationalRepository,
    },
  ],
  exports: [OrderItemSeedService, OrderItemFactory],
})
export class OrderItemSeedModule {}
