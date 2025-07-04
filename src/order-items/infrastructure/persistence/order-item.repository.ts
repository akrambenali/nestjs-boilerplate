import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderItem } from '../../domain/order-item';

import { SortOrderItemDto } from '../../dto/query-order-items.dto';

export abstract class OrderItemRepository {
  abstract create(
    data: Omit<OrderItem, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<OrderItem>;

  abstract findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortOrderItemDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<OrderItem[]>;

  abstract findById(id: OrderItem['id']): Promise<NullableType<OrderItem>>;
  abstract findByIds(ids: OrderItem['id'][]): Promise<OrderItem[]>;

  abstract update(
    id: OrderItem['id'],
    payload: DeepPartial<OrderItem>,
  ): Promise<OrderItem | null>;

  abstract remove(id: OrderItem['id']): Promise<void>;
}
