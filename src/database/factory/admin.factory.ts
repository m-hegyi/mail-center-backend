import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Admin } from '../../entity/admin.entity';

export interface IAdminFactoryContext {
  name?: string;
  password?: string;
}

define(Admin, (faker: typeof Faker, context?: IAdminFactoryContext) => {
  const admin = new Admin();
  admin.name = context?.name || faker.internet.userName();
  admin.password = context?.password || faker.random.word();

  return admin;
});
