import { Module } from '@nestjs/common';
import { EncrypterFake } from 'src/infra/common/Encrypter/EncrypterFake';
import { TokenGeneratorFake } from 'src/infra/common/TokenGenerator/TokenGeneratorFake';
import { DatasourceModule } from '../datasource/datasource.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepositoryMemory } from 'src/infra/repositories/UsersRepository/UsersRepositoryMemory';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: new UsersRepositoryMemory(),
    },
    {
      provide: 'ENCRYPTER',
      useValue: new EncrypterFake(),
    },
    {
      provide: 'TOKEN_GENERATOR',
      useValue: new TokenGeneratorFake(),
    },
  ],
  imports: [DatasourceModule],
})
export class AuthModule {}
