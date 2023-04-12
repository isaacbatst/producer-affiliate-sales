import { Transaction, TransactionParams } from './Transaction';
import { TransactionType } from './TransactionType';

type CreditTransactionType =
  | TransactionType.CREATOR_SELL
  | TransactionType.AFFILIATE_SELL
  | TransactionType.COMMISION_RECEIVEMENT;

type CreditTransactionParams = TransactionParams & {
  type: CreditTransactionType;
};

export class CreditTransaction extends Transaction {
  protected override readonly type: CreditTransactionType;

  constructor(params: CreditTransactionParams) {
    super(params);
  }

  public apply(): void {
    this.seller.creditBalance(this.getValue());
  }
}
