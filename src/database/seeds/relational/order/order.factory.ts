import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../../../orders/infrastructure/persistence/relational/entities/order.entity';
import { OrderStatusEnum } from '../../../../order-statuses/order-statuses.enum';
import { PaymentStatusEnum } from '../../../../payment-statuses/payment-statuses.enum';

@Injectable()
export class OrderFactory {
  constructor(
    @InjectRepository(OrderEntity)
    private repositoryOrder: Repository<OrderEntity>,
  ) {}

  createRandomOrder() {
    // Need for saving "this" context
    return () => {
      return this.repositoryOrder.create({
        user: {
          id: faker.number.int({ min: 1, max: 3 }),
        },
        paymentStatus: getRandomPaymentStatus(),
        totalAmount: faker.number.int({ min: 1000, max: 100000 }),
        status: getRandomOrderStatus(),
      });
    };
  }
}

const PaymentStatusLabels: Record<PaymentStatusEnum, string> = {
  [PaymentStatusEnum.paye]: 'Payé',
  [PaymentStatusEnum.non_paye]: 'Non payé',
  [PaymentStatusEnum.en_attente]: 'En attente',
  [PaymentStatusEnum.echouee]: 'Échouée',
  [PaymentStatusEnum.annulee]: 'Annulée',
  [PaymentStatusEnum.remboursee]: 'Remboursée',
};

export function getRandomPaymentStatus(): {
  id: PaymentStatusEnum;
  name: string;
} {
  const values = Object.values(PaymentStatusEnum).filter(
    (val) => typeof val === 'number',
  ) as PaymentStatusEnum[];
  const randomIndex = Math.floor(Math.random() * values.length);
  const id = values[randomIndex];
  const name = PaymentStatusLabels[id];

  return { id, name };
}

const OrderStatusLabels: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.brouillon]: 'Brouillon',
  [OrderStatusEnum.en_attente_de_paiement]: 'En attente de paiement',
  [OrderStatusEnum.payee]: 'Payée',
  [OrderStatusEnum.en_preparation]: 'En préparation',
  [OrderStatusEnum.prete_a_retirer]: 'Prête à retirer',
  [OrderStatusEnum.en_livraison]: 'En livraison',
  [OrderStatusEnum.livree]: 'Livrée',
  [OrderStatusEnum.annulee]: 'Annulée',
  [OrderStatusEnum.echouee]: 'Échouée',
  [OrderStatusEnum.remboursee]: 'Remboursée',
  [OrderStatusEnum.partiellement_livree]: 'Partiellement livrée',
};

export function getRandomOrderStatus(): { id: OrderStatusEnum; name: string } {
  const values = Object.values(OrderStatusEnum).filter(
    (val) => typeof val === 'number',
  ) as OrderStatusEnum[];
  const randomIndex = Math.floor(Math.random() * values.length);
  const id = values[randomIndex];
  const name = OrderStatusLabels[id];

  return { id, name };
}
