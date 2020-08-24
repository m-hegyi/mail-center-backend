import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Company } from '../../entity/company.entity';
import { UserRole } from '../../entity/user-role.entity';

export interface IUserRoleFactoryContext {
  name: string;
  description?: string;
}

define(UserRole, (faker: typeof Faker, context?: IUserRoleFactoryContext) => {
  const role = new UserRole();

  role.name = context?.name || '';
  role.description = context?.description || '';

  return role;
});
