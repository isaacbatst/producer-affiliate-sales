import { Module } from '@nestjs/common';
import { EncrypterBcrypt } from 'src/infra/common/Encrypter/EncrypterBcrypt';
import { TokenGeneratorCrypto } from 'src/infra/common/TokenGenerator/TokenGeneratorCrypto';
import { DatasourceModule } from '../datasource/datasource.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'ENCRYPTER',
      useClass: EncrypterBcrypt,
    },
    {
      provide: 'TOKEN_GENERATOR',
      useClass: TokenGeneratorCrypto,
    },
  ],
  imports: [DatasourceModule],
})
export class AuthModule {}
