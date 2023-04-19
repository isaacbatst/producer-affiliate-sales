import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { EncrypterFake } from 'src/infra/common/Encrypter/EncrypterFake';
import { TokenGeneratorFake } from 'src/infra/common/TokenGenerator/TokenGeneratorFake';
import { UsersRepositoryMemory } from 'src/infra/repositories/UsersRepository/UsersRepositoryMemory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Constants } from 'src/common/constants';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  const usersRepository = new UsersRepositoryMemory();
  const encrypter = new EncrypterFake();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: APP_PIPE, useValue: new ValidationPipe() },
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
    controller = module.get<AuthController>(AuthController);
    usersRepository.users = UsersRepositoryMemory.initialData;
  });

  it('should sign in', async () => {
    const cookieFn = jest.fn();
    await controller.signIn(
      {
        email: 'u1@u1.com',
        password: '1234',
      },
      {
        cookie: cookieFn,
      } as unknown as Response,
    );
    expect(cookieFn).toHaveBeenCalledWith(
      'token',
      'token-1',
      expect.objectContaining({
        httpOnly: true,
      }),
    );
    expect(usersRepository.users[0].getSessions().length).toBe(1);
  });
});
