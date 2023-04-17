import { SellerType } from '../Seller/SellerType';
import { Transaction } from './Transaction';

export class TransactionCommissionReceivement extends Transaction {
  public override apply(): void {
    const affiliate = this.getSeller();
    affiliate.creditBalance(this.getValue());
  }

  protected override makeSellerType(): SellerType {
    return SellerType.AFFILIATE;
  }
}
