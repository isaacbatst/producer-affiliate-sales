import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';

export class TransactionCommissionPayment extends Transaction {
  public override apply(): void {
    const creator = this.product.getCreator();
    creator.debitBalance(this.getValue());
  }

  protected override makeSellerType(): SellerType {
    return SellerType.CREATOR;
  }
}
