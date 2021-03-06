import * as Boom from '@hapi/boom';
import { User } from '../entities/users.entity';

class UserService {
  public async findUserById(userId: number): Promise<User> {
    const user: User = await User.findOne(userId);
    if (!user) throw Boom.notFound();

    return user;
  }

  public async deleteUser(userId: number): Promise<void> {
    await User.delete({ id: userId });
  }
}

export default UserService;
