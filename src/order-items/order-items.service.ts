import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderItemRepository } from './infrastructure/persistence/order-item.repository';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './domain/order-item';
import { SortOrderItemDto } from './dto/query-order-items.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderRepository } from '../orders/infrastructure/persistence/order.repository';
import { ProductRepository } from '../products/infrastructure/persistence/product.repository';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly orderItemsRepository: OrderItemRepository,
    private readonly ordersRepository: OrderRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    // Do not remove comment below.
    // <creating-property />
    const order = await this.ordersRepository.findById(
      createOrderItemDto.order.id,
    );
    if (!order) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          order: 'orderNotExists',
        },
      });
    }

    const product = await this.productsRepository.findById(
      createOrderItemDto.product.id,
    );
    if (!product) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'productNotExists',
        },
      });
    }
    return this.orderItemsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      order: order,
      product: product,
      quantity: createOrderItemDto.quantity,
      unitPrice: createOrderItemDto.unitPrice,
    });
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortOrderItemDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<OrderItem[]> {
    return this.orderItemsRepository.findManyWithPagination({
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: OrderItem['id']): Promise<NullableType<OrderItem>> {
    return this.orderItemsRepository.findById(id);
  }

  findByIds(ids: OrderItem['id'][]): Promise<OrderItem[]> {
    return this.orderItemsRepository.findByIds(ids);
  }

  async update(
    id: OrderItem['id'],
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem | null> {
    // Do not remove comment below.
    // <updating-property />

    return this.orderItemsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      quantity: updateOrderItemDto.quantity,
      unitPrice: updateOrderItemDto.unitPrice,
    });
  }

  async remove(id: OrderItem['id']): Promise<void> {
    await this.orderItemsRepository.remove(id);
  }
}
