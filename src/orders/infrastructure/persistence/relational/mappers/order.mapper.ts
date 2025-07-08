import { Order } from '../../../../domain/order';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { OrderEntity } from '../entities/order.entity';
import { OrderStatusEntity } from '../../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    } else if (raw.user === null) {
      domainEntity.user = null;
    }

    domainEntity.adresse = raw.adresse;
    domainEntity.totalAmount = raw.totalAmount;
    domainEntity.id = raw.id;
    domainEntity.status = raw.status;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Order): OrderEntity {
    const persistenceEntity = new OrderEntity();
    let status: OrderStatusEntity | undefined = undefined;

    if (domainEntity.status) {
      status = new OrderStatusEntity();
      status.id = Number(domainEntity.status.id);
    }

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    } else if (domainEntity.user === null) {
      persistenceEntity.user = null;
    }

    persistenceEntity.adresse = domainEntity.adresse;

    persistenceEntity.totalAmount = domainEntity.totalAmount;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.status = status;

    return persistenceEntity;
  }
}
