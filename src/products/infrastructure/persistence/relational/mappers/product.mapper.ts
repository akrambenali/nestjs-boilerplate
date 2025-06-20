import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { Product } from '../../../../domain/product';

import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    domainEntity.status = raw.status;

    domainEntity.stock = raw.stock;

    domainEntity.unit = raw.unit;

    domainEntity.price = raw.price;

    domainEntity.description = raw.description;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();

    let status: StatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new StatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    persistenceEntity.status = status;

    persistenceEntity.stock = domainEntity.stock;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.price = domainEntity.price;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
