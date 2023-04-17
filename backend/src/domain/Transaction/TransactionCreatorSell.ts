import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';

export class TransactionCreatorSell extends Transaction {
  public override apply(): void {
    const creator = this.product.getCreator();
    creator.creditBalance(this.getValue());
  }

  protected override makeSellerType(): SellerType {
    return SellerType.CREATOR;
  }
}
