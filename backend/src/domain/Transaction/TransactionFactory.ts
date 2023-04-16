import { Product } from '../Product/Product';
import { Seller } from '../Seller/Seller';
import { Transaction } from './Transaction';
import { TransactionType } from './TransactionType';

export interface TransactionFactoryCreateParams {
  type: number;
  date: Date;
  product: Product;
  value: number;
  seller: Seller;
  id: string;
}

export interface TransactionFactory {
  shouldCreate(type: TransactionType): boolean;
  create(params: TransactionFactoryCreateParams): Transaction;
}
