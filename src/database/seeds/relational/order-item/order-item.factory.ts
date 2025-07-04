import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../../../../order-items/infrastructure/persistence/relational/entities/order-item.entity';
import { ProductRepository } from '../../../../products/infrastructure/persistence/product.repository';
import { OrderRepository } from '../../../../orders/infrastructure/persistence/order.repository';

@Injectable()
export class OrderItemFactory {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repositoryOrderItem: Repository<OrderItemEntity>,
    private readonly productsRepository: ProductRepository,
    private readonly ordersRepository: OrderRepository,
  ) {}

  async getRandomProduct() {
    const products = await this.productsRepository.findManyWithPagination({
      paginationOptions: {
        page: 1,
        limit: 1000,
      },
    });
    return products[faker.number.int({ min: 0, max: products.length - 1 })].id;
  }

  async getRandomOrder() {
    const orders = await this.ordersRepository.findManyWithPagination({
      paginationOptions: {
        page: 1,
        limit: 1000,
      },
    });
    return orders[faker.number.int({ min: 0, max: orders.length - 1 })].id;
  }

  async createRandomOrderItem() {
    const productId = await this.getRandomProduct();
    const orderId = await this.getRandomOrder();

    return this.repositoryOrderItem.create({
      product: { id: productId },
      order: { id: orderId },
      unitPrice: faker.number.int({ min: 1000, max: 100000 }),
      quantity: faker.number.int({ min: 10, max: 200 }),
    });
  }
}
