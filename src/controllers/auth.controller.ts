import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { CreateUserDto } from '../common/dtos/users.dto';
import { RequestWithUser } from '../common/interfaces/auth.interface';
import { User } from '../entities/users.entity';
import AuthService from '../services/auth.service';

class AuthController {
  constructor(private authService = new AuthService()) {}
  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, token } = await this.authService.register(userData);

      const userResponse = _.omit(user, ['password']);
      res.status(201).json({ ...userResponse, token });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { user, token } = await this.authService.login(userData);

      res.cookie('Authorization', token, {
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        secure: true,
      });

      const userResponse = _.omit(user, ['password']);

      res.status(200).json({ ...userResponse, token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public authenticateSocial = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = await AuthService.createAuthToken(req.user as User);

    res.cookie('Authorization', token, {
      httpOnly: true,
      signed: true,
      sameSite: 'strict',
      secure: true,
    });

    const userResponse = _.omit(req.user, ['password']);
    return res.status(200).json({ token: token, ...userResponse });
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie('Authorization');
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
