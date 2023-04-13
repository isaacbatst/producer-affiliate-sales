import { Seller } from 'src/domain/Seller/Seller';
import { SellersRepository } from './sellers.repository';

export class SellersRepositoryMemory implements SellersRepository {
  sellers: Seller[] = [];
  async getByNames(names: string[]): Promise<Seller[]> {
    return this.sellers.filter((seller) => names.includes(seller.getName()));
  }
  async updateMany(sellers: Seller[]): Promise<void> {
    sellers.forEach((seller) => {
      const index = this.sellers.findIndex((s) => s.getId() === seller.getId());
      if (index < 0) {
        throw new Error('Seller not found');
      }
      this.sellers[index] = seller;
    });
  }
  async createMany(sellers: Seller[]): Promise<void> {
    this.sellers.push(...sellers);
  }
}
