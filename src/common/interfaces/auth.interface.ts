import { Request } from 'express';
import { User } from '../../entities/users.entity';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: any;
}

export interface RequestWithUser extends Request {
  user: User;
}
