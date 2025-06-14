import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductFactory } from './product.factory';

@Injectable()
export class ProductSeedService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
    private productFactory: ProductFactory,
  ) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.productFactory.createRandomProduct(), {
        count: 5,
      }),
    );
  }
}
