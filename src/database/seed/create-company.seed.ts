import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CompanyData } from '../../entity/company-data.entity';
import { ICompanyDataFactoryContext } from '../factory/company-data.factory';

export default class CreateCompanies implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory<CompanyData, ICompanyDataFactoryContext>(
      CompanyData,
    )().create();
  }
}
