import { join } from 'path';

export class Constants {
  // paths
  static readonly ROOT_DIR = join(__dirname, '../../');

  // common providers
  static readonly ID_GENERATOR = 'ID_GENERATOR';
  static readonly TOKEN_GENERATOR = 'TOKEN_GENERATOR';
  static readonly ENCRYPTER = 'ENCRYPTER';

  // repositories
  static readonly USERS_REPOSITORY = 'USERS_REPOSITORY';
  static readonly TRANSACTIONS_REPOSITORY = 'TRANSACTIONS_REPOSITORY';
  static readonly SELLERS_REPOSITORY = 'SELLERS_REPOSITORY';
  static readonly PRODUCTS_REPOSITORY = 'PRODUCTS_REPOSITORY';

  // services
  static readonly PRISMA_SERVICE = 'PRISMA_SERVICE';
}
