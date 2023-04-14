import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Constants } from '../src/common/constants';
import * as path from 'path';
import * as fs from 'fs/promises';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Given empty datasource', () => {
    it('/transactions (GET)', () => {
      return request(app.getHttpServer())
        .get('/transactions')
        .expect(200)
        .expect([]);
    });

    it('/transactions (GET)', () => {
      return request(app.getHttpServer())
        .get('/transactions')
        .expect(200)
        .expect([]);
    });
  });

  describe('Given processing sales', () => {
    it('/transactions/process (POST)', async () => {
      const filePath = path.join(Constants.ROOT_DIR, 'sample', 'sales.txt');
      const fileExists = fs.stat(filePath).then((stats) => stats.isFile());
      expect(fileExists).toBeTruthy();

      await request(app.getHttpServer())
        .post('/transactions/process')
        .set('Content-Type', 'multipart/form-data')
        .attach('sales', filePath)
        .expect(204);

      const transactions = await request(app.getHttpServer()).get(
        '/transactions',
      );
      expect(transactions.body).toHaveLength(20);

      const sellers = await request(app.getHttpServer()).get('/sellers');
      expect(sellers.body).toHaveLength(7);
    });
  });
});
