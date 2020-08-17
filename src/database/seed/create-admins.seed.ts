import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Admin } from '../../entity/admin.entity';
import { IAdminFactoryContext } from '../factory/admin.factory';

export default class CreateAdmins implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory<Admin, IAdminFactoryContext>(Admin)().create();
  }
}
