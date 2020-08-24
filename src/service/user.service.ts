import { User } from '../entity/user.entity';
import { getRepository } from 'typeorm';
import { Company } from '../entity/company.entity';

interface ICreateUser {
  userName: string;
  email: string;
  password: string;
  companyId: number;
}
const create = async ({
  userName,
  email,
  password,
  companyId,
}: ICreateUser): Promise<User> => {
  const userRepository = await getRepository(User);
  const companyRepository = await getRepository(Company);

  const oldUser = await userRepository.findOne({ where: { email } });

  if (oldUser) {
    throw new Error('This email is already in use!');
  }

  const company = await companyRepository.findOne({ where: { id: companyId } });

  if (!company) {
    throw new Error('Not a valid company!');
  }

  const user = new User();

  user.company = company;
  user.userName = userName;
  user.email = email;
  user.password = password;

  userRepository.save(user);

  return user;
};

export default {
  create,
};
