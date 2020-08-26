import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CompanyData } from '../../entity/company-data.entity';
import { ICompanyDataFactoryContext } from '../factory/company-data.factory';
import { User } from '../../entity/user.entity';
import { IUserFactoryContext } from '../factory/user.factory';
import { UserRole } from '../../entity/user-role.entity';

export default class CreateCompanyAndUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const companyData = await factory<CompanyData, ICompanyDataFactoryContext>(
      CompanyData,
    )().create();

    const roles = await connection.getRepository(UserRole).find();

    await factory<User, IUserFactoryContext>(User)({
      company: companyData.company,
      roles,
    }).createMany(10);
  }
}
