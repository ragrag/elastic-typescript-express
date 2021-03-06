import { Router } from 'express';
import passport from 'passport';
import '../middlewares/passport';
import githubAccessTokenMiddleware from '../middlewares/githubAccessToken.middleware';
import googleAccessTokenMiddleware from '../middlewares/googleAccessToken.middleware';
import AuthController from '../../controllers/auth.controller';
import { CreateUserDto } from '../../common/dtos/users.dto';
import Route from '../../common/interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import jwtAuthMiddeware from '../middlewares/jwt-cookie-auth.middleware';

class AuthRoute implements Route {
  public router = Router();

  constructor(private authController = new AuthController()) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', validationMiddleware(CreateUserDto, 'body'), this.authController.register);
    this.router.post('/login', validationMiddleware(CreateUserDto, 'body'), this.authController.login);
    this.router.post('/logout', [jwtAuthMiddeware], this.authController.logout);
    this.router.post(
      `/oauth/facebook`,
      [
        passport.authenticate('facebook-token', {
          session: false,
          scope: ['email'],
        }),
      ],
      this.authController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      },
    );
    this.router.post(
      `/oauth/google`,
      [
        googleAccessTokenMiddleware,
        passport.authenticate('google-oauth-token', {
          session: false,
          scope: ['email'],
        }),
      ],
      this.authController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      },
    );
    this.router.post(
      `/oauth/github`,
      [
        githubAccessTokenMiddleware,
        passport.authenticate('github-token', {
          session: false,
          scope: ['email'],
        }),
      ],
      this.authController.authenticateSocial,
      (error, req, res, next) => {
        if (error) {
          res.status(400).send(error.message);
        }
      },
    );
  }
}

export default AuthRoute;
