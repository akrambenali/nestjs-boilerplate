import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemRepository } from './infrastructure/persistence/order-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderItem } from './domain/order-item';

@Injectable()
export class OrderItemsService {
  constructor(
    // Dependencies here
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOrderItemDto: CreateOrderItemDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.orderItemRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderItemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderItem['id']) {
    return this.orderItemRepository.findById(id);
  }

  findByIds(ids: OrderItem['id'][]) {
    return this.orderItemRepository.findByIds(ids);
  }

  async update(
    id: OrderItem['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.orderItemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: OrderItem['id']) {
    return this.orderItemRepository.remove(id);
  }
}
