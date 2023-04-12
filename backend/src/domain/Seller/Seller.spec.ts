import { Seller } from './Seller';

describe('Seller', () => {
  it('should create an instance', () => {
    const seller = new Seller({
      id: 'id',
      name: 'name',
      balance: 0,
    });

    expect(seller).toBeDefined();
    expect(seller.getId()).toBe('id');
    expect(seller.getName()).toBe('name');
    expect(seller.getBalance()).toBe(0);
  });

  it('should credit seller', () => {
    const seller = new Seller({
      id: 'id',
      name: 'name',
      balance: 10,
    });

    seller.creditBalance(10);

    expect(seller.getBalance()).toBe(20);
  });

  it('should debit seller', () => {
    const seller = new Seller({
      id: 'id',
      name: 'name',
      balance: 10,
    });

    seller.debitBalance(10);

    expect(seller.getBalance()).toBe(0);
  });
});
