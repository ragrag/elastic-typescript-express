import 'dotenv/config';
import request from 'supertest';
import App from '../../app';
import IndexRoute from '../../api/routes/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const app = new App([indexRoute]);

      return request(app.getServer()).get(`/api/v1/`).expect(200);
    });
  });
});
