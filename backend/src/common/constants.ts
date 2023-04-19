import { join } from 'path';

export class Constants {
  static readonly ROOT_DIR = join(__dirname, '../../');
  static readonly TOKEN_GENERATOR = 'TOKEN_GENERATOR';
  static readonly ENCRYPTER = 'ENCRYPTER';
  static readonly USERS_REPOSITORY = 'USERS_REPOSITORY';
  static readonly PRISMA_SERVICE = 'PRISMA_SERVICE';
}
