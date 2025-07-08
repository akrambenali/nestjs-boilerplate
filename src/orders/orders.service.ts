import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { OrderStatus } from '../order-statuses/domain/order-status';
import { OrderStatusEnum } from '../order-statuses/order-statuses.enum';
import { FilterOrderDto, SortOrderDto } from './dto/query-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Do not remove comment below.
    // <creating-property />

    let status: OrderStatus | undefined = undefined;

    if (createOrderDto.status?.id) {
      const statusObject = Object.values(OrderStatusEnum)
        .map(String)
        .includes(String(createOrderDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createOrderDto.status.id,
      };
    }

    return this.ordersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      adresse: createOrderDto.adresse,
      totalAmount: createOrderDto.totalAmount,
      status: status,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterOrderDto | null;
    sortOptions?: SortOrderDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Order[]> {
    return this.ordersRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Order['id']): Promise<NullableType<Order>> {
    return this.ordersRepository.findById(id);
  }

  findByIds(ids: Order['id'][]): Promise<Order[]> {
    return this.ordersRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | null> {
    // Do not remove comment below.
    // <updating-property />

    let status: OrderStatus | undefined = undefined;

    if (updateOrderDto.status?.id) {
      const statusObject = Object.values(OrderStatusEnum)
        .map(String)
        .includes(String(updateOrderDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: updateOrderDto.status.id,
      };
    }

    return this.ordersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      adresse: updateOrderDto.adresse,
      totalAmount: updateOrderDto.totalAmount,
      status,
    });
  }

  async remove(id: Order['id']): Promise<void> {
    await this.ordersRepository.remove(id);
  }
}
