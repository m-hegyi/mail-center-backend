import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entity/user.entity';
import { Company } from '../../entity/company.entity';

export interface IUserFactoryContext {
  company: Company;
  email?: string;
  userName?: string;
  iconUrl?: string;
  password?: string;
}

define(User, (faker: typeof Faker, context?: IUserFactoryContext) => {
  const user = new User();

  user.email = context?.email || faker.internet.email();
  user.userName = context?.userName || faker.internet.userName();
  user.iconUrl = context?.iconUrl || undefined;
  user.password = context?.password || faker.internet.password();
  user.company = context?.company;
  // @TODO
  //user.role;

  return user;
});
