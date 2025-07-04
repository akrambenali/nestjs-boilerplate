import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItemEntity } from '../../../../order-items/infrastructure/persistence/relational/entities/order-item.entity';
import { OrderItemFactory } from './order-item.factory';

@Injectable()
export class OrderItemSeedService {
  constructor(
    @InjectRepository(OrderItemEntity)
    private repository: Repository<OrderItemEntity>,
    private orderItemFactory: OrderItemFactory,
  ) {}

  async run() {
    const orderItems = faker.helpers.multiple(
      () => this.orderItemFactory.createRandomOrderItem(),
      {
        count: 50,
      },
    );

    await this.repository.save(await Promise.all(orderItems));
  }
}
