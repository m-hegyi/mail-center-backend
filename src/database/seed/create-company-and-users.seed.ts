import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CompanyData } from '../../entity/company-data.entity';
import { ICompanyDataFactoryContext } from '../factory/company-data.factory';
import { User } from '../../entity/user.entity';
import { IUserFactoryContext } from '../factory/user.factory';
import { UserRole } from '../../entity/user-role.entity';
import { IUserRoleFactoryContext } from '../factory/user-role.factory';

export default class CreateCompanyAndUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const companyData = await factory<CompanyData, ICompanyDataFactoryContext>(
      CompanyData,
    )().create();

    const promises: Promise<UserRole>[] = [];

    ['owner', 'administrator', 'user'].forEach((name) => {
      const promise = factory<UserRole, IUserRoleFactoryContext>(UserRole)({
        name,
      }).create();
      promises.push(promise);
    });

    const roles = await Promise.all(promises);

    await factory<User, IUserFactoryContext>(User)({
      company: companyData.company,
      roles,
    }).createMany(10);
  }
}
