import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, In } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ProductRepository } from '../../product.repository';
import { ProductEntity } from '../entities/product.entity';
import { Product } from '../../../../domain/product';
import { ProductMapper } from '../mappers/product.mapper';
import {
  FilterProductDto,
  SortProductDto,
} from '../../../../dto/query-products.dto';

@Injectable()
export class ProductsRelationalRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const newEntity = await this.productsRepository.save(
      this.productsRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterProductDto | null;
    sortOptions?: SortProductDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]> {
    const query = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.status', 'status');

    // Recherche sécurisée : on ne filtre que si search est défini, non vide et non undefined
    if (
      filterOptions?.search &&
      typeof filterOptions.search === 'string' &&
      filterOptions.search.trim().length > 0
    ) {
      const searchTerm = `%${filterOptions.search.trim()}%`;
      query.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search)',
        { search: searchTerm },
      );
    }

    // Filtre par status si des IDs valides sont présents
    if (filterOptions?.status?.length) {
      const statusIds = filterOptions.status
        .map((s) => Number(s.id))
        .filter((id) => !isNaN(id) && id > 0);
      if (statusIds.length) {
        query.andWhere('status.id IN (:...statusIds)', { statusIds });
      }
    }

    // Tri selon options ou par date de création par défaut
    if (sortOptions?.length) {
      for (const sort of sortOptions) {
        if (sort.orderBy && sort.order) {
          query.addOrderBy(
            `product.${sort.orderBy}`,
            sort.order.toUpperCase() as 'ASC' | 'DESC',
          );
        }
      }
    } else {
      query.addOrderBy('product.createdAt', 'DESC');
    }

    // Pagination
    query.skip((paginationOptions.page - 1) * paginationOptions.limit);
    query.take(paginationOptions.limit);

    const entities = await query.getMany();
    return entities.map((product) => ProductMapper.toDomain(product));
  }

  async findById(id: Product['id']): Promise<NullableType<Product>> {
    const entity = await this.productsRepository.findOne({
      where: { id: id },
    });

    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Product['id'][]): Promise<Product[]> {
    const entities = await this.productsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((product) => ProductMapper.toDomain(product));
  }

  async findByName(name: Product['name']): Promise<NullableType<Product>> {
    const entity = await this.productsRepository.findOne({
      where: { name: name },
    });

    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async update(id: Product['id'], payload: Partial<Product>): Promise<Product> {
    const entity = await this.productsRepository.findOne({
      where: { id: id },
    });

    if (!entity) {
      throw new Error('Product not found');
    }

    const updatedEntity = await this.productsRepository.save(
      this.productsRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productsRepository.softDelete(id);
  }
}
