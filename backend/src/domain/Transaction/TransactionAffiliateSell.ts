import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';

export class TransactionAffiliateSell extends Transaction {
  public apply(): void {
    const creator = this.product.getCreator();
    creator.creditBalance(this.getValue());
  }
  protected override makeSellerType(): SellerType {
    return SellerType.AFFILIATE;
  }
}
