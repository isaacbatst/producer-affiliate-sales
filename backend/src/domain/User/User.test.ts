import { User } from './User';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password_hash',
    });
    expect(user.getId()).toBe('any_id');
    expect(user.getName()).toBe('any_name');
    expect(user.getEmail()).toBe('any_email');
    expect(user.getPassword()).toBe('any_password_hash');
  });
});
