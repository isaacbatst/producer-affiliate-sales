import { Transaction } from './Transaction';
import { TransactionCommissionPayment } from './TransactionCommissionPayment';
import {
  TransactionFactoryHandler,
  TransactionFactoryCreateParams,
} from './TransactionFactory';
import { TransactionType } from './TransactionType';

export class TransactionFactoryCommissionPayment
  implements TransactionFactoryHandler
{
  shouldCreate(type: TransactionType): boolean {
    return type === TransactionType.COMMISSION_PAYMENT;
  }
  create(params: TransactionFactoryCreateParams): Transaction {
    return new TransactionCommissionPayment(params);
  }
}
