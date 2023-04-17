import { Product } from 'src/domain/Product/Product';

export interface ProductsRepository {
  createMany(products: Product[]): Promise<void>;
  getByNames(names: string[]): Promise<Product[]>;
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
}
