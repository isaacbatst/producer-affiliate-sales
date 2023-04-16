import { Seller } from '../Seller/Seller';

export interface TransactionOperation {
  apply(value: number, seller: Seller): void;
}
