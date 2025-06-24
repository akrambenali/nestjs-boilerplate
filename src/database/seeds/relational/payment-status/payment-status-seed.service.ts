import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatusEntity } from '../../../../payment-statuses/infrastructure/persistence/relational/entities/payment-status.entity';
import { Repository } from 'typeorm';
import { PaymentStatusEnum } from '../../../../payment-statuses/payment-statuses.enum';

@Injectable()
export class PaymentStatusSeedService {
  constructor(
    @InjectRepository(PaymentStatusEntity)
    private repository: Repository<PaymentStatusEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: PaymentStatusEnum.paye,
          name: 'Payé',
        }),
        this.repository.create({
          id: PaymentStatusEnum.en_attente,
          name: 'En attente',
        }),
        this.repository.create({
          id: PaymentStatusEnum.annulee,
          name: 'Annulée',
        }),
        this.repository.create({
          id: PaymentStatusEnum.echouee,
          name: 'Échouée',
        }),
        this.repository.create({
          id: PaymentStatusEnum.remboursee,
          name: 'Remboursée',
        }),
        this.repository.create({
          id: PaymentStatusEnum.non_paye,
          name: 'Non payé',
        }),
      ]);
    }
  }
}
