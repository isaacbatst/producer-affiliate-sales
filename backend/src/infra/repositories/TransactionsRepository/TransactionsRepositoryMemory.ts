import { Transaction } from '../../../domain/Transaction/Transaction';
import { ProductsRepositoryMemory } from '../../../modules/products/products.repository.memory';
import { SellersRepositoryMemory } from '../../../modules/sellers/sellers.repository.memory';
import { TransactionsRepository } from '../../../modules/transactions/transactions.repository';

export class TransactionsRepositoryMemory implements TransactionsRepository {
  transactions: Transaction[] = [];

  constructor(
    private readonly productsRepository: ProductsRepositoryMemory,
    private readonly sellersRepository: SellersRepositoryMemory,
  ) {}

  async createMany(transaction: Transaction[]): Promise<void> {
    this.transactions.push(...transaction);

    const products = transaction.map((transaction) => transaction.getProduct());
    const uniqueProducts = this.getUniques(products);
    await this.productsRepository.createMany(uniqueProducts);

    const sellers = transaction.map((transaction) => transaction.getSeller());
    const uniqueSellers = this.getUniques(sellers);
    await this.sellersRepository.createMany(uniqueSellers);
  }

  async getAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async getByProduct(id: string): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) => transaction.getProduct().getId() === id,
    );
  }

  async getBySeller(id: string): Promise<Transaction[]> {
    return this.transactions.filter(
      (transaction) => transaction.getSeller().getId() === id,
    );
  }

  private getUniques<T extends { getId(): string }>(array: T[]): T[] {
    return array.filter(
      (item, index) =>
        array.findIndex((findItem) => findItem.getId() === item.getId()) ===
        index,
    );
  }
}
