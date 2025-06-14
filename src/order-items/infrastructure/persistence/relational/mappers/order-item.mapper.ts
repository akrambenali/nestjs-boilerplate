import { OrderItem } from '../../../../domain/order-item';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { OrderMapper } from '../../../../../orders/infrastructure/persistence/relational/mappers/order.mapper';

import { OrderItemEntity } from '../entities/order-item.entity';

export class OrderItemMapper {
  static toDomain(raw: OrderItemEntity): OrderItem {
    const domainEntity = new OrderItem();
    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.quantity = raw.quantity;

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: OrderItem): OrderItemEntity {
    const persistenceEntity = new OrderItemEntity();
    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.quantity = domainEntity.quantity;

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }

    if (domainEntity.order) {
      persistenceEntity.order = OrderMapper.toPersistence(domainEntity.order);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
