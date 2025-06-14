import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../../../products/infrastructure/persistence/relational/entities/product.entity';
import { ProductSeedService } from './product-seed.service';
import { ProductFactory } from './product.factory';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductSeedService, ProductFactory],
  exports: [ProductSeedService, ProductFactory],
})
export class ProductSeedModule {}
