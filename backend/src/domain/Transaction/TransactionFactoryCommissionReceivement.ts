import { Transaction } from './Transaction';
import { TransactionCommissionReceivement } from './TransactionCommissionReceivement';
import {
  TransactionFactory,
  TransactionFactoryCreateParams,
} from './TransactionFactory';
import { TransactionType } from './TransactionType';

export class TransactionFactoryCommissionReceivement
  implements TransactionFactory
{
  shouldCreate(type: TransactionType): boolean {
    return type === TransactionType.COMMISION_RECEIVEMENT;
  }
  create(params: TransactionFactoryCreateParams): Transaction {
    return new TransactionCommissionReceivement(params);
  }
}
