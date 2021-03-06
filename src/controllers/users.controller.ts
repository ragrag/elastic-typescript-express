import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { RequestWithUser } from '../common/interfaces/auth.interface';
import { User } from '../entities/users.entity';
import UserService from '../services/users.service';

class UsersController {
  constructor(private userService = new UserService()) {}

  public getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userResponse = _.omit(req.user, ['password']);
      res.status(200).json({ ...userResponse });
    } catch (error) {
      next(error);
    }
  };

  public findUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const user: User = await this.userService.findUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userService.deleteUser(req.user.id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
