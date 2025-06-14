import { Payment } from '../../../../domain/payment';
import { OrderMapper } from '../../../../../orders/infrastructure/persistence/relational/mappers/order.mapper';

import { PaymentEntity } from '../entities/payment.entity';

export class PaymentMapper {
  static toDomain(raw: PaymentEntity): Payment {
    const domainEntity = new Payment();
    if (raw.order) {
      domainEntity.order = OrderMapper.toDomain(raw.order);
    }

    domainEntity.method = raw.method;

    domainEntity.paymentDate = raw.paymentDate;

    domainEntity.amount = raw.amount;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Payment): PaymentEntity {
    const persistenceEntity = new PaymentEntity();
    if (domainEntity.order) {
      persistenceEntity.order = OrderMapper.toPersistence(domainEntity.order);
    }

    persistenceEntity.method = domainEntity.method;

    persistenceEntity.paymentDate = domainEntity.paymentDate;

    persistenceEntity.amount = domainEntity.amount;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
