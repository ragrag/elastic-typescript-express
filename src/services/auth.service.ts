import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import { CreateUserDto } from '../common/dtos/users.dto';
import { DataStoredInToken, TokenData } from '../common/interfaces/auth.interface';
import { User } from '../entities/users.entity';
import { isEmpty } from '../common/utils/util';

class AuthService {
  public async register(userData: CreateUserDto): Promise<{ user: User; token: string }> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const findUser: User = await User.findOne({ where: { email: userData.email } });
    if (findUser) throw Boom.conflict(`You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createdUser: User = await User.save({ ...userData, password: hashedPassword } as User);

    const { token } = AuthService.createAuthToken(createdUser);
    return { user: createdUser, token };
  }

  public async login(userData: CreateUserDto): Promise<{ user: User; token: string }> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const user: User = await User.findOne({ where: { email: userData.email } });
    if (!user) throw Boom.notFound();

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordMatching) throw Boom.unauthorized();

    const { token } = AuthService.createAuthToken(user);

    return { user, token };
  }

  public static createAuthToken(user: User, expiresIn = '7d'): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }
}

export default AuthService;
