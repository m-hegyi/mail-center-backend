import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Company } from '../../entity/company.entity';
import { CompanyData } from '../../entity/company-data.entity';

export interface ICompanyFactoryContext {
  name?: string;
}

define(Company, (faker: typeof Faker, context?: ICompanyFactoryContext) => {
  const company = new Company();

  company.name = context?.name || faker.company.companyName();

  return company;
});
