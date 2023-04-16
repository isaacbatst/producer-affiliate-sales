import { Seller } from '../Seller/Seller';
import { TransactionOperation } from './TransactionOperation';

export class TransactionOperationDebit implements TransactionOperation {
  apply(value: number, seller: Seller): void {
    seller.debitBalance(value);
  }
}
