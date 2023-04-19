import { User } from 'src/domain/User/User';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  addSession(user: User): Promise<void>;
}
