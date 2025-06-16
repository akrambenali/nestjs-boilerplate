import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { OrdersService } from '../orders/orders.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemRepository } from './infrastructure/persistence/order-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderItem } from './domain/order-item';
import { Order } from '../orders/domain/order';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly orderService: OrdersService,

    // Dependencies here
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    // Do not remove comment below.
    // <creating-property />

    const productObject = await this.productService.findById(
      createOrderItemDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    const orderObject = await this.orderService.findById(
      createOrderItemDto.order.id,
    );
    if (!orderObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          order: 'notExists',
        },
      });
    }
    const order = orderObject;

    return this.orderItemRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      unitPrice: createOrderItemDto.unitPrice,

      quantity: createOrderItemDto.quantity,

      product,

      order,
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

    updateOrderItemDto: UpdateOrderItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let product: Product | undefined = undefined;

    if (updateOrderItemDto.product) {
      const productObject = await this.productService.findById(
        updateOrderItemDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    }

    let order: Order | undefined = undefined;

    if (updateOrderItemDto.order) {
      const orderObject = await this.orderService.findById(
        updateOrderItemDto.order.id,
      );
      if (!orderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            order: 'notExists',
          },
        });
      }
      order = orderObject;
    }

    return this.orderItemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      unitPrice: updateOrderItemDto.unitPrice,

      quantity: updateOrderItemDto.quantity,

      product,

      order,
    });
  }

  remove(id: OrderItem['id']) {
    return this.orderItemRepository.remove(id);
  }
}
