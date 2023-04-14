import { Transaction } from 'src/domain/Transaction/Transaction';
import { TransactionsRepository } from '../../../modules/transactions/transactions.repository';

export class TransactionsRepositoryMemory implements TransactionsRepository {
  transactions: Transaction[] = [];

  async createMany(transaction: Transaction[]): Promise<void> {
    this.transactions.push(...transaction);
  }
}
