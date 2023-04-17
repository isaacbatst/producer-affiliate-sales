import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductsMapper } from './products.mapper';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: ProductsRepository,
  ) {}

  async getAll(): Promise<ProductDto[]> {
    const products = await this.productsRepository.getAll();
    return products.map(ProductsMapper.toDto);
  }

  async getById(id: string): Promise<ProductDto> {
    const product = await this.productsRepository.getById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return ProductsMapper.toDto(product);
  }
}
