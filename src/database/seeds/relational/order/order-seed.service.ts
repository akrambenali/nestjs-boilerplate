import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../../../orders/infrastructure/persistence/relational/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderFactory } from './order.factory';

@Injectable()
export class OrderSeedService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
    private orderFactory: OrderFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.orderFactory.createRandomOrder(), {
        count: 5,
      }),
    );
  }
}
