import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Todo Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/todo/set-item (POST)', () => {
    it('created todo', () => {
      return request(app.getHttpServer())
        .post('/todo/set-item')
        .send({
          id: '1',
          title: 'tt',
          description: 'opis',
          isDone: false,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 201,
            message: 'Successfully created item',
          });
        });
    });
  });

  describe('/todo/remove-item (DELETE)', () => {
    it.skip('removed todo', async () => {
      const server = app.getHttpServer();
      await request(server).post('/todo/set-item').send({
        id: '1',
        title: 'tt',
        description: 'opis',
        isDone: false,
      });
      return request(server)
        .delete('/todo/remove-item?itemId=1')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 200,
            message: 'Successfully deleted item',
          });
        });
    });
  });

  describe('/todo/get-all (GET)', () => {
    it('create two items and return them', async () => {
      const server = app.getHttpServer();
      const item = {
        id: '1',
        title: 'tt',
        description: 'opis',
        isDone: false,
      };
      const item2 = {
        id: '2',
        title: 'tt',
        description: 'opis',
        isDone: false,
      };
      await request(server).post('/todo/set-item').send(item);
      await request(server).post('/todo/set-item').send(item2);
      return request(server)
        .get('/todo/get-all')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([item, item2]);
        });
    });

    it('create two items and return them with filter', async () => {
      const server = app.getHttpServer();
      const item = {
        id: '1',
        title: 'tt',
        description: 'opis',
        isDone: false,
      };
      const item2 = {
        id: '2',
        title: 'tt',
        description: 'opis',
        isDone: true,
      };
      await request(server).post('/todo/set-item').send(item);
      await request(server).post('/todo/set-item').send(item2);
      return request(server)
        .get('/todo/get-all?filter=finished')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([item2]);
        });
    });
  });

  describe('/todo/set-status (GET)', () => {
    it('create item and change its status', async () => {
      const server = app.getHttpServer();
      const item = {
        id: '1',
        title: 'tt',
        description: 'opis',
        isDone: false,
      };
      await request(server).post('/todo/set-item').send(item);
      return request(server)
        .post('/todo/set-status')
        .send({
          id: '1',
          isDone: true,
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 201,
            message: 'Successfully updated item',
          });
        });
    });

    it('item should not exists', async () => {
      const server = app.getHttpServer();
      const item = {
        id: '3456789',
        isDone: false,
      };
      return request(server)
        .post('/todo/set-status')
        .send(item)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            message: 'Item does not exist.',
          });
        });
    });
  });
});
