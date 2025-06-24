import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentStatusEntity } from '../../../../payment-statuses/infrastructure/persistence/relational/entities/payment-status.entity';
import { PaymentStatusSeedService } from './payment-status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  providers: [PaymentStatusSeedService],
  exports: [PaymentStatusSeedService],
})
export class PaymentStatusSeedModule {}
