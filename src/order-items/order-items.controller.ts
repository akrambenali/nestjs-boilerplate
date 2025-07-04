import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { infinityPagination } from '../utils/infinity-pagination';
import { OrderItemsService } from './order-items.service';
import { OrderItem } from './domain/order-item';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { QueryOrderItemDto } from './dto/query-order-items.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Order Items')
@Controller({
  path: 'order-items',
  version: '1',
})
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @ApiCreatedResponse({
    type: OrderItem,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderItem),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryOrderItemDto,
  ): Promise<InfinityPaginationResponseDto<OrderItem>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderItemsService.findManyWithPagination({
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: OrderItem,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: OrderItem['id']): Promise<NullableType<OrderItem>> {
    return this.orderItemsService.findById(id);
  }

  @ApiOkResponse({
    type: OrderItem,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: OrderItem['id'],
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem | null> {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: OrderItem['id']): Promise<void> {
    return this.orderItemsService.remove(id);
  }
}
