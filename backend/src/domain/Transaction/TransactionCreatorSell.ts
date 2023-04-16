import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';
import { TransactionOperation } from './TransactionOperation';
import { TransactionOperationCredit } from './TransactionOperationCredit';

export class TransactionCreatorSell extends Transaction {
  protected makeOperation(): TransactionOperation {
    return new TransactionOperationCredit();
  }

  protected override makeSellerType(): SellerType {
    return SellerType.CREATOR;
  }
}
