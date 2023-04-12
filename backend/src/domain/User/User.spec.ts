import { User } from './User';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User({
      id: 'id',
      name: 'name',
      balance: 0,
    });

    expect(user).toBeDefined();
    expect(user.getId()).toBe('id');
    expect(user.getName()).toBe('name');
    expect(user.getBalance()).toBe(0);
  });

  it('should credit user', () => {
    const user = new User({
      id: 'id',
      name: 'name',
      balance: 10,
    });

    user.creditBalance(10);

    expect(user.getBalance()).toBe(20);
  });

  it('should debit user', () => {
    const user = new User({
      id: 'id',
      name: 'name',
      balance: 10,
    });

    user.debitBalance(10);

    expect(user.getBalance()).toBe(0);
  });
});
