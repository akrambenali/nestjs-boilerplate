import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../order-statuses/domain/order-status';
import { FilterOrderDto, SortOrderDto } from './dto/query-orders.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserRepository } from '../users/infrastructure/persistence/user.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    private readonly usersRepository: UserRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Do not remove comment below.
    // <creating-property />
    const user = await this.usersRepository.findById(createOrderDto.user.id);
    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotExists',
        },
      });
    }

    let status: OrderStatus | undefined = undefined;

    if (createOrderDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
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
      user: user,
      paymentStatus: createOrderDto.paymentStatus,
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
      const statusObject = Object.values(StatusEnum)
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
      paymentStatus: updateOrderDto.paymentStatus,
      totalAmount: updateOrderDto.totalAmount,
      status,
    });
  }

  async remove(id: Order['id']): Promise<void> {
    await this.ordersRepository.remove(id);
  }
}
