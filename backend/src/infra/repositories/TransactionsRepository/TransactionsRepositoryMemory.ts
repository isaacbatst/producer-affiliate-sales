import { Transaction } from 'src/domain/Transaction/Transaction';
import { TransactionsRepository } from '../../../modules/transactions/transactions.repository';
import { ProductsRepository } from 'src/modules/products/products.repository';
import { SellersRepository } from 'src/modules/sellers/sellers.repository';

export class TransactionsRepositoryMemory implements TransactionsRepository {
  transactions: Transaction[] = [];

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly sellersRepository: SellersRepository,
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

  private getUniques<T extends { getId(): string }>(array: T[]): T[] {
    return array.filter(
      (item, index) =>
        array.findIndex((findItem) => findItem.getId() === item.getId()) ===
        index,
    );
  }
}
