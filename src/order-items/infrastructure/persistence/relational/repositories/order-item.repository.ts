import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderItemRepository } from '../../order-item.repository';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderItem } from '../../../../domain/order-item';
import { OrderItemMapper } from '../mappers/order-item.mapper';
import { SortOrderItemDto } from '../../../../dto/query-order-items.dto';

@Injectable()
export class OrderItemsRelationalRepository implements OrderItemRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    private readonly orderItemsRepository: Repository<OrderItemEntity>,
  ) {}

  async create(data: OrderItem): Promise<OrderItem> {
    const persistenceModel = OrderItemMapper.toPersistence(data);
    const newEntity = await this.orderItemsRepository.save(
      this.orderItemsRepository.create(persistenceModel),
    );
    return OrderItemMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortOrderItemDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<OrderItem[]> {
    const where: FindOptionsWhere<OrderItemEntity> = {};

    const entities = await this.orderItemsRepository.find({
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

    return entities.map((orderItem) => OrderItemMapper.toDomain(orderItem));
  }

  async findById(id: OrderItem['id']): Promise<NullableType<OrderItem>> {
    const entity = await this.orderItemsRepository.findOne({
      where: { id: id },
    });

    return entity ? OrderItemMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderItem['id'][]): Promise<OrderItem[]> {
    const entities = await this.orderItemsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((orderItem) => OrderItemMapper.toDomain(orderItem));
  }

  async update(
    id: OrderItem['id'],
    payload: Partial<OrderItem>,
  ): Promise<OrderItem> {
    const entity = await this.orderItemsRepository.findOne({
      where: { id: id },
    });

    if (!entity) {
      throw new Error('OrderItem not found');
    }

    const updatedEntity = await this.orderItemsRepository.save(
      this.orderItemsRepository.create(
        OrderItemMapper.toPersistence({
          ...OrderItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderItemMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderItem['id']): Promise<void> {
    await this.orderItemsRepository.softDelete(id);
  }
}
