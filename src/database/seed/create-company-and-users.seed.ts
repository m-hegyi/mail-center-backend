import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CompanyData } from '../../entity/company-data.entity';
import { ICompanyDataFactoryContext } from '../factory/company-data.factory';
import { User } from '../../entity/user.entity';
import { IUserFactoryContext } from '../factory/user.factory';

export default class CreateCompanyAndUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const companyData = await factory<CompanyData, ICompanyDataFactoryContext>(
      CompanyData,
    )().create();

    await factory<User, IUserFactoryContext>(User)({
      company: companyData.company,
    }).createMany(10);
  }
}
