import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';
import { TransactionOperation } from './TransactionOperation';
import { TransactionOperationDebit } from './TransactionOperationDebit';

export class TransactionCommissionReceivement extends Transaction {
  protected makeOperation(): TransactionOperation {
    return new TransactionOperationDebit();
  }

  protected override makeSellerType(): SellerType {
    return SellerType.AFFILIATE;
  }
}
