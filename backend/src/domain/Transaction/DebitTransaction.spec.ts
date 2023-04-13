import { Seller } from '../Seller/Seller';
import { DebitTransaction } from './DebitTransaction';
import { TransactionType } from './TransactionType';

const makeSut = () => {
  const date = new Date();
  const seller = new Seller({
    id: 'id',
    name: 'name',
    balance: 10,
  });
  const transaction = new DebitTransaction({
    product: 'product',
    value: 10,
    date,
    seller,
    id: 'transaction-id',
  });

  return {
    transaction,
    seller,
    date,
  };
};

describe('DebitTransaction', () => {
  it('should create a debit transaction', () => {
    const { date, seller, transaction } = makeSut();
    expect(transaction.getType()).toBe(TransactionType.COMMISSION_PAYMENT);
    expect(transaction.getDate()).toBe(date);
    expect(transaction.getProduct()).toBe('product');
    expect(transaction.getValue()).toBe(10);
    expect(transaction.getSeller()).toBe(seller);
  });

  it('should apply debit transaction', () => {
    const { seller, transaction } = makeSut();
    transaction.apply();
    expect(seller.getBalance()).toBe(0);
  });
});
