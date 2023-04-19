import { PrismaClient } from '@prisma/client';
import { EncrypterBcrypt } from '../src/infra/common/Encrypter/EncrypterBcrypt';
import { IdGeneratorCrypto } from '../src/infra/common/IdGenerator/IdGeneratorCrypto';
const prisma = new PrismaClient();
async function main() {
  const rootName = process.env.ROOT_NAME;
  const rootPassword = process.env.ROOT_PASSWORD;
  const rootEmail = process.env.ROOT_EMAIL;

  if (!rootName) throw new Error('ROOT_NAME is not defined');
  if (!rootPassword) throw new Error('ROOT_PASSWORD is not defined');
  if (!rootEmail) throw new Error('ROOT_EMAIL is not defined');

  const encrypter = new EncrypterBcrypt();
  const hash = await encrypter.hash(rootPassword);
  const idGenerator = new IdGeneratorCrypto();
  const id = await idGenerator.generate();

  await prisma.user.upsert({
    where: { email: rootEmail },
    update: {},
    create: {
      email: rootEmail,
      name: rootName,
      password: hash,
      id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
