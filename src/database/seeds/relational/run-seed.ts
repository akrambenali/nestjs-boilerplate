import { NestFactory } from '@nestjs/core';
import { OrderStatusSeedService } from './order-status/order-status-seed.service';
import { ProductSeedService } from './product/product-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.get(ProductSeedService).run();

  await app.get(OrderStatusSeedService).run();

  await app.close();
};

void runSeed();
