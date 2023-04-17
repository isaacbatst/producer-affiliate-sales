import { Transaction } from 'src/domain/Transaction/Transaction';

export interface TransactionsRepository {
  createMany(transaction: Transaction[]): Promise<void>;
  getAll(): Promise<Transaction[]>;
  getByProduct(id: string): Promise<Transaction[]>;
  getBySeller(id: string): Promise<Transaction[]>;
}
