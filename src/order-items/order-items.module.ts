import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { RelationalOrderItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    OrdersModule,

    // do not remove this comment
    RelationalOrderItemPersistenceModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService, RelationalOrderItemPersistenceModule],
})
export class OrderItemsModule {}
