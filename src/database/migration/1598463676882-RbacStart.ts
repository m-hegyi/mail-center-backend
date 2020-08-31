import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole } from '../../entity/user-role.entity';
import { UserPermission } from '../../entity/user-permission.entity';
import { RolePermission } from '../../entity/role-permission.entity';

export class RbacStart1598463676882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRoles: UserRole[] = [
      { id: 1, name: 'owner', description: '' },
      { id: 2, name: 'administrator', description: '' },
      { id: 3, name: 'user', description: '' },
    ];

    const userPermissions: UserPermission[] = [
      { id: 1, name: 'modifyUser', description: '' },
      { id: 2, name: 'modifyAdministrator', description: '' },
      { id: 3, name: 'modifyOwner', description: '' },
    ];

    const rolePermissions: RolePermission[] = [];

    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [2, 0],
    ].forEach(([roleIndex, permissionIndex], index) => {
      rolePermissions.push({
        id: index + 1,
        role: userRoles[roleIndex],
        permission: userPermissions[permissionIndex],
        createdAt: new Date(),
        modifiedAt: new Date(),
      });
    });

    await queryRunner.manager.getRepository(UserRole).insert(userRoles);
    await queryRunner.manager
      .getRepository(UserPermission)
      .insert(userPermissions);
    await queryRunner.manager
      .getRepository(RolePermission)
      .insert(rolePermissions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const rolePermissions = await queryRunner.manager
      .getRepository(RolePermission)
      .find();
    await queryRunner.manager
      .getRepository(RolePermission)
      .remove(rolePermissions);

    const permisssions = await queryRunner.manager
      .getRepository(UserPermission)
      .find();
    await queryRunner.manager
      .getRepository(UserPermission)
      .remove(permisssions);

    const roles = await queryRunner.manager.getRepository(UserRole).find();
    await queryRunner.manager.getRepository(UserRole).remove(roles);
  }
}
