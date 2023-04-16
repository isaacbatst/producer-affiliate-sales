import { Transaction } from './Transaction';
import { TransactionAffiliateSell } from './TransactionAffiliateSell';
import {
  TransactionFactory,
  TransactionFactoryCreateParams,
} from './TransactionFactory';
import { TransactionType } from './TransactionType';

export class TransactionFactoryAffiliateSell implements TransactionFactory {
  shouldCreate(type: TransactionType): boolean {
    return type === TransactionType.AFFILIATE_SELL;
  }
  create(params: TransactionFactoryCreateParams): Transaction {
    return new TransactionAffiliateSell(params);
  }
}
