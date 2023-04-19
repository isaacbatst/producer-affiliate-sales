import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Constants } from '../src/common/constants';
import * as path from 'path';
import * as fs from 'fs/promises';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Encrypter } from 'src/infra/common/Encrypter/Encrypter';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
const resetDatabase = async (app: INestApplication) => {
  const prisma = app.get<PrismaService>(Constants.PRISMA_SERVICE);
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();
  await prisma.seller.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
};

const rootUser = {
  id: 'user-1',
  email: 'u1@u1.com',
  password: '1234',
  name: 'John Doe',
};

const login = async (app: INestApplication) => {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: rootUser.email,
      password: rootUser.password,
    })
    .expect(200);

  return {
    authCookie: response.get('Set-Cookie')[0],
  };
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());

    await app.init();
    await resetDatabase(app);
  });

  afterAll(async () => {
    await resetDatabase(app);
  });

  describe('Given valid login request', () => {
    beforeAll(async () => {
      const encrypter = app.get<Encrypter>(Constants.ENCRYPTER);
      const hash = await encrypter.hash(rootUser.password);
      const prisma = app.get<PrismaService>(Constants.PRISMA_SERVICE);
      await prisma.user.create({
        data: {
          ...rootUser,
          password: hash,
        },
      });
    });

    it('/auth/login (POST) with correct password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: rootUser.email,
          password: rootUser.password,
        })
        .expect(200);

      const authCookie = cookie.parse(response.headers['set-cookie'][0]);
      expect(authCookie[Constants.AUTH_COOKIE]).not.toHaveLength(0);
    });

    it('/auth/login (POST) with incorrect password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: rootUser.email,
          password: 'wrong',
        })
        .expect(401);
    });

    it('/auth/validate (POST)', async () => {
      const { authCookie } = await login(app);
      await request(app.getHttpServer())
        .post('/auth/validate')
        .set('Cookie', authCookie)
        .expect(200)
        .expect({
          email: rootUser.email,
          name: rootUser.name,
          id: rootUser.id,
        });
    });

    it('/auth/validate (POST) with incorrect token', async () => {
      await request(app.getHttpServer()).post('/auth/validate').expect(401);
    });
  });

  describe('Given invalid login request', () => {
    it('/auth/login (POST) without password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: rootUser.email,
        })
        .expect(400);
    });

    it('/auth/login (POST) without email', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: rootUser.password,
        })
        .expect(400);
    });
  });

  describe('Given wrong session token', () => {
    it('/transactions (GET)', async () => {
      await login(app);
      return request(app.getHttpServer())
        .get('/transactions')
        .set('Cookie', 'wrong-session-token')
        .expect(401);
    });
  });

  describe('Given empty transaction datasource', () => {
    let authCookie: string;
    beforeAll(async () => {
      authCookie = (await login(app)).authCookie;
    });

    it('/transactions (GET)', async () => {
      return request(app.getHttpServer())
        .get('/transactions')
        .set('Cookie', authCookie)
        .expect(200)
        .expect([]);
    });

    it('/transactions (GET)', () => {
      return request(app.getHttpServer())
        .get('/transactions')
        .set('Cookie', authCookie)
        .expect(200)
        .expect([]);
    });
  });

  describe('Given processing sales', () => {
    let authCookie: string;

    beforeAll(async () => {
      authCookie = (await login(app)).authCookie;

      const filePath = path.join(Constants.ROOT_DIR, 'sample', 'sales.txt');
      const fileExists = fs.stat(filePath).then((stats) => stats.isFile());
      expect(fileExists).toBeTruthy();

      await request(app.getHttpServer())
        .post('/transactions/process')
        .set('Content-Type', 'multipart/form-data')
        .set('Cookie', authCookie)
        .attach('sales', filePath)
        .expect(204);
    });

    it('/transactions/process (POST)', async () => {
      const transactions = await request(app.getHttpServer())
        .get('/transactions')
        .set('Cookie', authCookie);
      expect(transactions.body).toHaveLength(20);

      const sellers = await request(app.getHttpServer())
        .get('/sellers')
        .set('Cookie', authCookie);

      expect(sellers.body).toHaveLength(7);
    });

    it('/products (GET)', async () => {
      const products = await request(app.getHttpServer())
        .get('/products')
        .set('Cookie', authCookie);

      expect(products.body).toHaveLength(3);
    });

    it('/products/:id/transactions (GET)', async () => {
      const products = await request(app.getHttpServer())
        .get('/products')
        .set('Cookie', authCookie);
      const [product] = products.body;
      const transactions = await request(app.getHttpServer())
        .get(`/products/${product.id}/transactions`)
        .set('Cookie', authCookie);
      expect(transactions.body).not.toHaveLength(0);
    });

    it('/sellers (GET)', async () => {
      const sellers = await request(app.getHttpServer())
        .get('/sellers')
        .set('Cookie', authCookie);

      expect(sellers.body).toHaveLength(7);
    });

    it('/sellers/:id/transactions (GET)', async () => {
      const sellers = await request(app.getHttpServer())
        .get('/sellers')
        .set('Cookie', authCookie);

      const [seller] = sellers.body;
      const transactions = await request(app.getHttpServer())
        .get(`/sellers/${seller.id}/transactions`)
        .set('Cookie', authCookie);

      expect(transactions.body).not.toHaveLength(0);
    });
  });
});
