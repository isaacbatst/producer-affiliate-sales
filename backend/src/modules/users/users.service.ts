import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 'user-1',
      name: 'john',
      email: 'changeme',
    },
    {
      id: 'user-2',
      name: 'maria',
      email: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find((user) => user.name === username);
  }
}
