import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../../entity/user-role.entity';

export class RbacStart1598463676882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRoles: UserRole[] = [
      { id: 1, name: 'owner', description: '' },
      { id: 2, name: 'administrator', description: '' },
      { id: 3, name: 'user', description: '' },
    ];

    await queryRunner.manager.getRepository(UserRole).insert(userRoles);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roles = await queryRunner.manager.getRepository(UserRole).find();
    await queryRunner.manager.getRepository(UserRole).remove(roles);
  }
}
