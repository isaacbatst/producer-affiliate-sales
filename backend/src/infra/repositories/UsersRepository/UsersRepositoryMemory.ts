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
  async addSession(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.getId() === user.getId());
    this.users[index] = user;
  }

  async findByToken(token: string): Promise<User | undefined> {
    return this.users.find((user) =>
      user.getSessions().find((session) => session.getToken() === token),
    );
  }

  async removeSession(user: User, token: string): Promise<void> {
    const index = user
      .getSessions()
      .findIndex((session) => session.getToken() === token);
    user.getSessions().splice(index, 1);
  }
}
