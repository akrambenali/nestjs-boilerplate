import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderRepository } from '../../order.repository';
import { OrderEntity } from '../entities/order.entity';
import { Order } from '../../../../domain/order';
import { OrderMapper } from '../mappers/order.mapper';
import { FilterOrderDto, SortOrderDto } from '../../../../dto/query-orders.dto';

@Injectable()
export class OrderRelationalRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) {}

  async create(data: Order): Promise<Order> {
    const persistenceModel = OrderMapper.toPersistence(data);
    const newEntity = await this.ordersRepository.save(
      this.ordersRepository.create(persistenceModel),
    );
    return OrderMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterOrderDto | null;
    sortOptions?: SortOrderDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Order[]> {
    const where: FindOptionsWhere<OrderEntity> = {};
    if (filterOptions?.paymentStatus?.length) {
      where.paymentStatus = filterOptions.paymentStatus.map(
        (paymentStatus) => ({
          id: Number(paymentStatus.id),
        }),
      );
    }
    if (filterOptions?.status?.length) {
      where.status = filterOptions.status.map((status) => ({
        id: Number(status.id),
      }));
    }

    const entities = await this.ordersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((order) => OrderMapper.toDomain(order));
  }

  async findById(id: Order['id']): Promise<NullableType<Order>> {
    const entity = await this.ordersRepository.findOne({
      where: { id: id },
    });

    return entity ? OrderMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Order['id'][]): Promise<Order[]> {
    const entities = await this.ordersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((order) => OrderMapper.toDomain(order));
  }

  async update(id: Order['id'], payload: Partial<Order>): Promise<Order> {
    const entity = await this.ordersRepository.findOne({
      where: { id: id },
    });

    if (!entity) {
      throw new Error('Product not found');
    }

    const updatedEntity = await this.ordersRepository.save(
      this.ordersRepository.create(
        OrderMapper.toPersistence({
          ...OrderMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderMapper.toDomain(updatedEntity);
  }

  async remove(id: Order['id']): Promise<void> {
    await this.ordersRepository.softDelete(id);
  }
}
