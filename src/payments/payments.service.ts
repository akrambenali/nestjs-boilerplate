import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/domain/order';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepository } from './infrastructure/persistence/payment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Payment } from './domain/payment';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly orderService: OrdersService,

    // Dependencies here
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // Do not remove comment below.
    // <creating-property />
    const orderObject = await this.orderService.findById(
      createPaymentDto.order.id,
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

    return this.paymentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      order,

      method: createPaymentDto.method,

      paymentDate: createPaymentDto.paymentDate,

      amount: createPaymentDto.amount,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.paymentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Payment['id']) {
    return this.paymentRepository.findById(id);
  }

  findByIds(ids: Payment['id'][]) {
    return this.paymentRepository.findByIds(ids);
  }

  async update(
    id: Payment['id'],

    updatePaymentDto: UpdatePaymentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let order: Order | undefined = undefined;

    if (updatePaymentDto.order) {
      const orderObject = await this.orderService.findById(
        updatePaymentDto.order.id,
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

    return this.paymentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      order,

      method: updatePaymentDto.method,

      paymentDate: updatePaymentDto.paymentDate,

      amount: updatePaymentDto.amount,
    });
  }

  remove(id: Payment['id']) {
    return this.paymentRepository.remove(id);
  }
}
