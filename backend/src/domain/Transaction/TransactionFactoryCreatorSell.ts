import { Transaction } from './Transaction';
import { TransactionCreatorSell } from './TransactionCreatorSell';
import {
  TransactionFactoryHandler,
  TransactionFactoryCreateParams,
} from './TransactionFactory';
import { TransactionType } from './TransactionType';

export class TransactionFactoryCreatorSell
  implements TransactionFactoryHandler
{
  shouldCreate(type: TransactionType): boolean {
    return type === TransactionType.CREATOR_SELL;
  }
  create(params: TransactionFactoryCreateParams): Transaction {
    return new TransactionCreatorSell(params);
  }
}
