import { IdGeneratorFake } from '../../infra/common/IdGenerator/IdGeneratorFake';
import { Seller } from '../Seller/Seller';
import { TransactionsListFactory } from './TransactionListFactory';

const makeSut = () => {
  const inputs = [
    {
      type: 1,
      date: '2022-01-15T19:20:30-03:00',
      product: 'CURSO DE BEM-ESTAR',
      value: 127.5,
      sellerName: 'JOSE CARLOS',
    },
    {
      type: 1,
      date: '2021-12-03T11:46:02-03:00',
      product: 'DOMINANDO INVESTIMENTOS',
      value: 500,
      sellerName: 'MARIA CANDIDA',
    },
  ];

  const transactionsListFactory = new TransactionsListFactory(
    new IdGeneratorFake(),
  );

  return {
    inputs,
    transactionsListFactory,
  };
};

describe('TransactionListFactory', () => {
  it('should create transactions', async () => {
    const { inputs, transactionsListFactory } = makeSut();
    const transactions = await transactionsListFactory.create(inputs, []);
    expect(transactions).toHaveLength(2);
    expect(transactions[0].getDate()).toEqual(new Date(inputs[0].date));
    expect(transactions[1].getDate()).toEqual(new Date(inputs[1].date));
  });

  it('should create unregistered sellers', async () => {
    const { inputs, transactionsListFactory } = makeSut();
    await transactionsListFactory.create(inputs, [
      new Seller({ id: 'seller-id', name: 'MARIA CANDIDA', balance: 0 }),
    ]);
    const unregisteredSellers =
      transactionsListFactory.getUnregisteredSellers();
    expect(unregisteredSellers).toHaveLength(1);
    expect(unregisteredSellers[0].getName()).toBe('JOSE CARLOS');
  });

  it('should create unregistered sellers once', async () => {
    const { inputs, transactionsListFactory } = makeSut();
    inputs.push({
      type: 1,
      date: '2022-01-15T19:20:30-03:00',
      product: 'CURSO DE BEM-ESTAR',
      value: 127.5,
      sellerName: 'JOSE CARLOS',
    });
    await transactionsListFactory.create(inputs, [
      new Seller({ id: 'seller-id', name: 'MARIA CANDIDA', balance: 0 }),
    ]);
    const unregisteredSellers =
      transactionsListFactory.getUnregisteredSellers();
    expect(unregisteredSellers).toHaveLength(1);
  });
});
