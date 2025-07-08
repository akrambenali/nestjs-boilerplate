import { OrderStatus } from '../order-statuses/domain/order-status';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';
import { OrderStatusEnum } from '../order-statuses/order-statuses.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />
    let status: OrderStatus | null | undefined = undefined;

    if (createOrderDto.status) {
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

    let user: User | null | undefined = undefined;

    if (createOrderDto.user) {
      const userObject = await this.userService.findById(
        createOrderDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (createOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      status,

      user,

      adresse: createOrderDto.adresse,

      totalAmount: createOrderDto.totalAmount,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let status: OrderStatus | null | undefined = undefined;

    if (updateOrderDto.status) {
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

    let user: User | null | undefined = undefined;

    if (updateOrderDto.user) {
      const userObject = await this.userService.findById(
        updateOrderDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    } else if (updateOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      status,

      user,

      adresse: updateOrderDto.adresse,

      totalAmount: updateOrderDto.totalAmount,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
