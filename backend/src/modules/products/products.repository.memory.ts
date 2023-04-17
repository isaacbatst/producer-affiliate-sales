import { Product } from '../../domain/Product/Product';
import { ProductsRepository } from './products.repository';

export class ProductsRepositoryMemory implements ProductsRepository {
  products: Product[] = [];
  async createMany(products: Product[]): Promise<void> {
    this.products.push(...products);
  }
  async getByNames(names: string[]): Promise<Product[]> {
    return this.products.filter((product) => names.includes(product.getName()));
  }

  async getById(id: string): Promise<Product | undefined> {
    return this.products.find((product) => product.getId() === id);
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }
}
