import { Seller } from '../../../domain/Seller/Seller';
import { TransactionRelatedFactory } from './TransactionListRelatedFactory';

export class TransactionRelatedFactorySeller
  implements TransactionRelatedFactory<Seller>
{
  create(id: string, name: string): Seller {
    return new Seller({
      id,
      balance: 0,
      name,
    });
  }
}
