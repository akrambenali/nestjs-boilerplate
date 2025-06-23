import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { StatusEnum } from '../statuses/statuses.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Status } from '../statuses/domain/status';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { Product } from './domain/product';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto, SortProductDto } from './dto/query-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Do not remove comment below.
    // <creating-property />

    let status: Status | undefined = undefined;

    if (createProductDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(createProductDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: createProductDto.status.id,
      };
    }

    return this.productsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createProductDto.name,
      description: createProductDto.description,
      stock: createProductDto.stock,
      price: createProductDto.price,
      unit: createProductDto.unit,
      status: status,
    });
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    return this.productsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Product['id']): Promise<NullableType<Product>> {
    return this.productsRepository.findById(id);
  }

  findByIds(ids: Product['id'][]): Promise<Product[]> {
    return this.productsRepository.findByIds(ids);
  }

  findByName(name: Product['name']): Promise<NullableType<Product>> {
    return this.productsRepository.findByName(name);
  }

  async update(
    id: Product['id'],
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    // Do not remove comment below.
    // <updating-property />

    let status: Status | undefined = undefined;

    if (updateProductDto.status?.id) {
      const statusObject = Object.values(StatusEnum)
        .map(String)
        .includes(String(updateProductDto.status.id));
      if (!statusObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            status: 'statusNotExists',
          },
        });
      }

      status = {
        id: updateProductDto.status.id,
      };
    }

    return this.productsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateProductDto.name,
      description: updateProductDto.description,
      stock: updateProductDto.stock,
      price: updateProductDto.price,
      unit: updateProductDto.unit,
      status,
    });
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productsRepository.remove(id);
  }
}
