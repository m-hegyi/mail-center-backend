import { User } from '../entity/user.entity';
import { getRepository } from 'typeorm';

interface ICreateUser {
  userName: string;
  email: string;
  password: string;
}
const create = async ({
  userName,
  email,
  password,
}: ICreateUser): Promise<User> => {
  const userRepository = await getRepository(User);

  const oldUser = await userRepository.findOne({ email });

  if (oldUser) {
    throw new Error('This email is already in use!');
  }

  const user = new User();

  user.userName = userName;
  user.email = email;
  user.password = password;

  userRepository.save(user);

  return user;
};

export default {
  create,
};
