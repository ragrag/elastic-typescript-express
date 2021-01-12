import 'dotenv/config';
import request from 'supertest';
import App from '../../app';
import IndexRoute from '../../api/routes/index.route';
import { db } from '../util/db';

let app;
beforeAll(async () => {
  const indexRoute = new IndexRoute();
  app = new App([indexRoute]);
  await app.initializeApp();
});

beforeEach(async () => {
  await db.clear();
});

describe('Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', async done => {
      const res = await request(app.getServer()).get(`/api/v1/`);
      expect(res.status).toBe(200);
      done();
    });
  });
});
