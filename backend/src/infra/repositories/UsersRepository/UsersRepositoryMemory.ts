import { User } from 'src/domain/User/User';
import { UsersRepository } from 'src/modules/users/users.repository';

export class UsersRepositoryMemory implements UsersRepository {
  static initialData: User[] = [
    new User({
      id: '1',
      name: 'User 1',
      email: 'u1@u1.com',
      password: '1234',
    }),
  ];

  users: User[] = UsersRepositoryMemory.initialData;

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.getEmail() === email);
  }
  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.getId() === user.getId());
    this.users[index] = user;
  }
}
