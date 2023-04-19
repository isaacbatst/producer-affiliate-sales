import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenGenerator } from 'src/infra/common/TokenGenerator/TokenGenerator';
import { Encrypter } from '../../infra/common/Encrypter/Encrypter';
import { UsersRepository } from '../users/users.repository';
import { Session } from 'src/domain/User/Session';
import { User } from 'src/domain/User/User';
import { UserDto } from '../users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: UsersRepository,
    @Inject('ENCRYPTER') private encrypter: Encrypter,
    @Inject('TOKEN_GENERATOR') private tokenGenerator: TokenGenerator,
  ) {}

  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await this.encrypter.compare(
      password,
      user.getPassword(),
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const token = await this.tokenGenerator.generate();
    const session = new Session({
      userId: user.getId(),
      createdAt: new Date(),
      token,
    });
    user.addSession(session);
    await this.usersRepository.addSession(user);
    return {
      token,
    };
  }
}
