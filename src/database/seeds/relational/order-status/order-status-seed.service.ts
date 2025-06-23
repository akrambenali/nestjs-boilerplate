import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatusEntity } from '../../../../order-statuses/infrastructure/persistence/relational/entities/order-status.entity';
import { Repository } from 'typeorm';
import { OrderStatusEnum } from '../../../../order-statuses/order-statuses.enum';

@Injectable()
export class OrderStatusSeedService {
  constructor(
    @InjectRepository(OrderStatusEntity)
    private repository: Repository<OrderStatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: OrderStatusEnum.brouillon,
          name: 'Brouillon',
        }),
        this.repository.create({
          id: OrderStatusEnum.en_attente_de_paiement,
          name: 'En attente de paiement',
        }),
        this.repository.create({
          id: OrderStatusEnum.payee,
          name: 'Payée',
        }),
        this.repository.create({
          id: OrderStatusEnum.en_preparation,
          name: 'En préparation',
        }),
        this.repository.create({
          id: OrderStatusEnum.prete_a_retirer,
          name: 'Prête à retirer',
        }),
        this.repository.create({
          id: OrderStatusEnum.en_livraison,
          name: 'En livraison',
        }),
        this.repository.create({
          id: OrderStatusEnum.livree,
          name: 'Livrée',
        }),
        this.repository.create({
          id: OrderStatusEnum.annulee,
          name: 'Annulée',
        }),
        this.repository.create({
          id: OrderStatusEnum.echouee,
          name: 'Échouée',
        }),
        this.repository.create({
          id: OrderStatusEnum.remboursee,
          name: 'Remboursée',
        }),
        this.repository.create({
          id: OrderStatusEnum.partiellement_livree,
          name: 'Partiellement livrée',
        }),
      ]);
    }
  }
}
