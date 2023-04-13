import { Transaction, TransactionParams } from './Transaction';
import { TransactionType } from './TransactionType';

type DebitTransactionType = TransactionType.COMMISSION_PAYMENT;

export class DebitTransaction extends Transaction {
  protected override readonly type!: DebitTransactionType;

  constructor(params: Omit<TransactionParams, 'type'>) {
    super({
      ...params,
      type: TransactionType.COMMISSION_PAYMENT,
    });
  }

  apply(): void {
    this.seller.debitBalance(this.getValue());
  }
}
