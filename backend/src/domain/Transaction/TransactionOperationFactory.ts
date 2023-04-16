import { TransactionOperationCredit } from './TransactionOperationCredit';
import { TransactionOperationDebit } from './TransactionOperationDebit';
import { TransactionType } from './TransactionType';

export class TransactionOperationFactory {
  static create(transactionType: TransactionType) {
    if (
      transactionType === TransactionType.AFFILIATE_SELL ||
      transactionType === TransactionType.COMMISION_RECEIVEMENT ||
      transactionType === TransactionType.CREATOR_SELL
    ) {
      return new TransactionOperationCredit();
    }

    if (transactionType === TransactionType.COMMISSION_PAYMENT) {
      return new TransactionOperationDebit();
    }

    throw new Error('Invalid transaction type');
  }
}
