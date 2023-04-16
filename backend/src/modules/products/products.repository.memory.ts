import { Product } from 'src/domain/Product/Product';
import { ProductsRepository } from './products.repository';

export class ProductsRepositoryMemory implements ProductsRepository {
  products: Product[] = [];

  async createMany(products: Product[]): Promise<void> {
    this.products.push(...products);
  }
  async getByNames(names: string[]): Promise<Product[]> {
    return this.products.filter((product) => names.includes(product.getName()));
  }
}
