import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { CompanyData } from '../../entity/company-data.entity';
import { Company } from '../../entity/company.entity';
import { ICompanyFactoryContext } from './company.factory';

export interface ICompanyDataFactoryContext {
  name?: string;
  contactEmail?: string;
  address?: string;
  billNumber?: string;
}

define(CompanyData, (
  faker: typeof Faker,
  context?: ICompanyDataFactoryContext,
) => {
  const companyData = new CompanyData();

  companyData.contactEmail = context?.contactEmail || faker.internet.email();
  companyData.address = context?.address || '';
  companyData.billNumber = context?.billNumber || faker.finance.account();

  companyData.company = factory(Company)(
    context as ICompanyFactoryContext,
  ) as any;

  return companyData;
});
