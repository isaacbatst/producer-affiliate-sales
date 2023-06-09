import { Product } from '../../../domain/Product/Product';
import { Seller } from '../../../domain/Seller/Seller';
import { TransactionRelatedFactory } from './TransactionListRelatedFactory';
import { TransactionType } from '../../../domain/Transaction/TransactionType';

export class TransactionRelatedFactoryProduct
  implements TransactionRelatedFactory<Product>
{
  constructor(
    private seller: Seller,
    private price: number,
    private transactionType: TransactionType,
  ) {}
  create(id: string, name: string): Product {
    if (this.transactionType === TransactionType.CREATOR_SELL) {
      return new Product({
        creator: this.seller,
        price: this.price,
        id,
        name,
      });
    }

    throw new Error('First product transaction must be a creator sell');
  }
}
