import { Seller } from '../Seller/Seller';
import { CreditTransaction } from './CreditTransaction';
import { DebitTransaction } from './DebitTransaction';
import { Transaction } from './Transaction';
import { TransactionType } from './TransactionType';

type TransactionFactoryParams = {
  id: string;
  type: number;
  date: Date;
  product: string;
  value: number;
  seller: Seller;
};

export class TransactionFactory {
  static create(params: TransactionFactoryParams): Transaction {
    const { date, id, product, seller, type, value } = params;
    if (
      type === TransactionType.AFFILIATE_SELL ||
      type === TransactionType.COMMISION_RECEIVEMENT ||
      type === TransactionType.CREATOR_SELL
    ) {
      return new CreditTransaction({
        date,
        product,
        value,
        seller,
        id,
        type,
      });
    }

    if (type === TransactionType.COMMISSION_PAYMENT) {
      return new DebitTransaction({
        date,
        product,
        value,
        seller,
        id,
      });
    }

    throw new Error('UNKNOWN_TRANSACTION_TYPE');
  }
}
