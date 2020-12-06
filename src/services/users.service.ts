import bcrypt from 'bcrypt';
import { CreateUserDto } from '../common/dtos/users.dto';
import * as Boom from '@hapi/boom';

import { User } from '../entities/users.entity';
import { isEmpty } from '../common/utils/util';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await User.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await User.findOne(userId);
    if (!findUser) throw Boom.conflict();

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const findUser: User = await User.findOne({ where: { email: userData.email } });
    if (findUser) throw Boom.conflict(`You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await User.save({ ...userData, password: hashedPassword } as User);

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User> {
    if (isEmpty(userData)) throw Boom.badRequest();

    const findUser: User = await User.findOne({ where: { id: userId } });
    if (!findUser) throw Boom.notFound();

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await User.update(userId, { ...userData, password: hashedPassword });

    const updateUser: User = await User.findOne({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await User.findOne({ where: { id: userId } });
    if (!findUser) throw Boom.notFound();

    await User.delete({ id: userId });
    return findUser;
  }
}

export default UserService;
