import { Transaction } from './Transaction';
import { TransactionCommissionReceivement } from './TransactionCommissionReceivement';
import {
  TransactionFactoryHandler,
  TransactionFactoryCreateParams,
} from './TransactionFactory';
import { TransactionType } from './TransactionType';

export class TransactionFactoryCommissionReceivement
  implements TransactionFactoryHandler
{
  shouldCreate(type: TransactionType): boolean {
    return type === TransactionType.COMMISION_RECEIVEMENT;
  }
  create(params: TransactionFactoryCreateParams): Transaction {
    return new TransactionCommissionReceivement(params);
  }
}
