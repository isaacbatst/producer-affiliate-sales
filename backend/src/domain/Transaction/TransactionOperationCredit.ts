import { Seller } from '../Seller/Seller';
import { TransactionOperation } from './TransactionOperation';

export class TransactionOperationCredit implements TransactionOperation {
  apply(value: number, seller: Seller): void {
    seller.creditBalance(value);
  }
}
