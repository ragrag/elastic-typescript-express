import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import { CreateUserDto } from '../common/dtos/users.dto';
import { DataStoredInToken, TokenData } from '../common/interfaces/auth.interface';
import { User } from '../entities/users.entity';
import { isEmpty } from '../common/utils/util';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const findUser: User = await User.findOne({ where: { email: userData.email } });
    if (findUser) throw Boom.conflict(`You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await User.save({ ...userData, password: hashedPassword } as User);
    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ token: string; findUser: User }> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const findUser: User = await User.findOne({ where: { email: userData.email } });
    if (!findUser) throw Boom.notFound();

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw Boom.unauthorized();

    const { token } = this.createToken(findUser);

    return { token, findUser };
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }
}

export default AuthService;
