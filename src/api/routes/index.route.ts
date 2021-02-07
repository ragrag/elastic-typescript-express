import { Router } from 'express';
import IndexController from '../../controllers/index.controller';
import Route from '../../common/interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();

  constructor(private indexController = new IndexController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
