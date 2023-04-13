import { Seller } from '../Seller/Seller';
import { CreditTransaction } from './CreditTransaction';
import { TransactionType } from './TransactionType';

const makeSut = () => {
  const date = new Date();
  const seller = new Seller({
    id: 'id',
    name: 'name',
    balance: 0,
  });
  const transaction = new CreditTransaction({
    product: 'product',
    value: 10,
    date,
    seller,
    id: 'transaction-id',
    type: TransactionType.AFFILIATE_SELL,
  });

  return {
    transaction,
    seller,
    date,
  };
};

describe('CreditTransaction', () => {
  it('should create a credit transaction', () => {
    const { date, seller, transaction } = makeSut();
    expect(transaction.getType()).toBe(TransactionType.AFFILIATE_SELL);
    expect(transaction.getDate()).toBe(date);
    expect(transaction.getProduct()).toBe('product');
    expect(transaction.getValue()).toBe(10);
    expect(transaction.getSeller()).toBe(seller);
  });

  it('should apply credit transaction', () => {
    const { seller, transaction } = makeSut();
    transaction.apply();
    expect(seller.getBalance()).toBe(10);
  });
});
