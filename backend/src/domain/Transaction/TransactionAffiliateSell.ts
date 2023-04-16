import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';
import { TransactionOperation } from './TransactionOperation';
import { TransactionOperationCredit } from './TransactionOperationCredit';

export class TransactionAffiliateSell extends Transaction {
  public override apply(): void {
    super.apply();
    this.product.addAffiliate(this.seller);
  }
  protected makeOperation(): TransactionOperation {
    return new TransactionOperationCredit();
  }

  protected override makeSellerType(): SellerType {
    return SellerType.AFFILIATE;
  }
}
