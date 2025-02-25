import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Admin } from '../../entity/admin.entity';

export interface IAdminFactoryContext {
  userName?: string;
  password?: string;
  email?: string;
}

define(Admin, (faker: typeof Faker, context?: IAdminFactoryContext) => {
  const admin = new Admin();
  admin.email = context?.email || faker.internet.email();
  admin.userName = context?.userName || faker.internet.userName();
  admin.password = context?.password || faker.random.word();

  return admin;
});
