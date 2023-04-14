import { Transaction } from 'src/domain/Transaction/Transaction';

export interface TransactionsRepository {
  createMany(transaction: Transaction[]): Promise<void>;
}