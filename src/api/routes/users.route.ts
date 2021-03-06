import { Router } from 'express';
import UsersController from '../../controllers/users.controller';
import { CreateUserDto } from '../../common/dtos/users.dto';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import jwtAuthMiddeware from '../middlewares/jwt-cookie-auth.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();

  constructor(private usersController = new UsersController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/user`, [jwtAuthMiddeware], this.usersController.getUser);
    this.router.get(`${this.path}/:id`, [jwtAuthMiddeware], this.usersController.findUserById);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
