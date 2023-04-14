import { Seller } from 'src/domain/Seller/Seller';

export interface SellersRepository {
  getAll(): Promise<Seller[]>;
  getByNames(names: string[]): Promise<Seller[]>;
  updateMany(sellers: Seller[]): Promise<void>;
  createMany(sellers: Seller[]): Promise<void>;
}
