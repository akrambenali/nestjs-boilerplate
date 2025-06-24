import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { OrderStatusEntity } from '../../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';
import { PaymentStatusEntity } from '../../../../../payment-statuses/infrastructure/persistence/relational/entities/payment-status.entity';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Order } from '../../../../domain/order';
import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();
    domainEntity.id = raw.id;
    domainEntity.user = raw.user;
    domainEntity.paymentStatus = raw.paymentStatus;
    domainEntity.status = raw.status;
    domainEntity.totalAmount = raw.totalAmount;
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

    let paymentStatus: PaymentStatusEntity | undefined = undefined;
    if (domainEntity.paymentStatus) {
      paymentStatus = new PaymentStatusEntity();
      paymentStatus.id = Number(domainEntity.paymentStatus.id);
    }

    let user: UserEntity | undefined = undefined;
    if (domainEntity.user) {
      user = new UserEntity();
      user.id = Number(domainEntity.user.id);
      user.email = domainEntity.user.email;
      user.firstName = domainEntity.user.firstName;
      user.lastName = domainEntity.user.lastName;
      user.photo = domainEntity.user.photo ? new FileEntity() : undefined;
      user.role = domainEntity.user.role ? new RoleEntity() : undefined;
      user.status = domainEntity.user.status ? new StatusEntity() : undefined;
    }

    persistenceEntity.user = user;
    persistenceEntity.status = status;
    persistenceEntity.paymentStatus = paymentStatus;
    persistenceEntity.totalAmount = domainEntity.totalAmount;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
