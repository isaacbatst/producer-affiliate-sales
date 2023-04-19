import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepositoryMemory } from '../../infra/repositories/UsersRepository/UsersRepositoryMemory';
import { EncrypterFake } from '../../infra/common/Encrypter/EncrypterFake';
import { TokenGeneratorFake } from '../../infra/common/TokenGenerator/TokenGeneratorFake';
import { Constants } from 'src/common/constants';

describe('AuthService', () => {
  let service: AuthService;
  const usersRepository = new UsersRepositoryMemory();
  const encrypter = new EncrypterFake();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: Constants.USERS_REPOSITORY,
          useValue: usersRepository,
        },
        {
          provide: Constants.ENCRYPTER,
          useValue: encrypter,
        },
        {
          provide: Constants.TOKEN_GENERATOR,
          useValue: new TokenGeneratorFake(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository.users = UsersRepositoryMemory.initialData;
  });

  it('should sign in', async () => {
    const { token } = await service.signIn('u1@u1.com', '1234');
    expect(token).toBe('token-1');
    expect(usersRepository.users[0].getSessions().length).toBe(1);
  });

  it('should throw if user not found', async () => {
    await expect(service.signIn('notfound@u1.com', '1234')).rejects.toThrow();
  });

  it('should throw if password is wrong', async () => {
    encrypter.isValidPassword = false;
    await expect(service.signIn('u1@u1.com', '1234')).rejects.toThrow();
  });
});
