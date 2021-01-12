import 'dotenv/config';
import './common/utils/handleRunErrors';
import App from './app';
import AuthRoute from './api/routes/auth.route';
import IndexRoute from './api/routes/index.route';
import UsersRoute from './api/routes/users.route';

import validateEnv from './common/utils/validateEnv';

(async () => {
  validateEnv();

  const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
  await app.initializeApp();
  app.listen();
})();
