import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';

@Injectable()
export class ProductFactory {
  constructor(
    @InjectRepository(ProductEntity)
    private repositoryProduct: Repository<ProductEntity>,
  ) {}

  createRandomProduct() {
    // Need for saving "this" context
    return () => {
      return this.repositoryProduct.create({
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 1000, max: 100000 }),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 0, max: 100 }),
        isActive: faker.datatype.boolean(),
        unit: faker.commerce.productMaterial(),
      });
    };
  }
}
