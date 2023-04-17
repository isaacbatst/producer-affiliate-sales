import { Product } from '../../domain/Product/Product';

export interface ProductsRepository {
  getByNames(names: string[]): Promise<Product[]>;
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
}
