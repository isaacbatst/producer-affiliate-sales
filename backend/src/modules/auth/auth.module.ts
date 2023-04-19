import { Module } from '@nestjs/common';
import { EncrypterBcrypt } from 'src/infra/common/Encrypter/EncrypterBcrypt';
import { TokenGeneratorCrypto } from 'src/infra/common/TokenGenerator/TokenGeneratorCrypto';
import { DatasourceModule } from '../datasource/datasource.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Constants } from 'src/common/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: Constants.ENCRYPTER,
      useClass: EncrypterBcrypt,
    },
    {
      provide: Constants.TOKEN_GENERATOR,
      useClass: TokenGeneratorCrypto,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [DatasourceModule],
})
export class AuthModule {}
