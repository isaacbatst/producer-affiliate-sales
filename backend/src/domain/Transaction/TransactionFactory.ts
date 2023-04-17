import { Product } from '../Product/Product';
import { Seller } from '../Seller/Seller';
import { Transaction } from './Transaction';
import { TransactionFactoryAffiliateSell } from './TransactionFactoryAffiliateSell';
import { TransactionFactoryCommissionPayment } from './TransactionFactoryCommissionPayment';
import { TransactionFactoryCommissionReceivement } from './TransactionFactoryCommissionReceivement';
import { TransactionFactoryCreatorSell } from './TransactionFactoryCreatorSell';
import { TransactionType } from './TransactionType';

export interface TransactionFactoryCreateParams {
  type: number;
  date: Date;
  product: Product;
  value: number;
  seller: Seller;
  id: string;
}

export interface TransactionFactoryHandler {
  shouldCreate(type: TransactionType): boolean;
  create(params: TransactionFactoryCreateParams): Transaction;
}

export class TransactionFactory {
  static transactionFactories: TransactionFactoryHandler[] = [
    new TransactionFactoryCreatorSell(),
    new TransactionFactoryAffiliateSell(),
    new TransactionFactoryCommissionPayment(),
    new TransactionFactoryCommissionReceivement(),
  ];

  static create(input: TransactionFactoryCreateParams): Transaction {
    const transactionFactory = this.transactionFactories.find((factory) =>
      factory.shouldCreate(input.type),
    );
    if (!transactionFactory) {
      throw new Error('Creating transaction from invalid transaction type');
    }

    return transactionFactory.create(input);
  }
}
