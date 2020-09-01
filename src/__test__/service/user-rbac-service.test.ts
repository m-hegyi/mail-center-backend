import userRbacService from '../../service/user-rbac.service';
import * as typeorm from 'typeorm';
import { UserRole } from '../../entity/user-role.entity';
import faker from 'faker';
import { UserPermission } from '../../entity/user-permission.entity';

let findMock = jest.fn();
let findOneMock = jest.fn();
let getOneMock = jest.fn();
let whereMock = jest.fn(() => ({
  getOne: getOneMock,
}));

const spyRepo: any = jest.spyOn(typeorm, 'getRepository');

spyRepo.mockImplementation(() => ({
  find: findMock,
  findOne: findOneMock,
  createQueryBuilder: () => ({
    where: whereMock,
  }),
}));

beforeEach(() => {
  findMock = jest.fn();
  findOneMock = jest.fn();
  getOneMock = jest.fn();
  whereMock = jest.fn(() => ({
    getOne: getOneMock,
  }));
});

const role1 = new UserRole();
role1.id = 1;
role1.name = 'role1';
role1.description = 'desc1';

const role2 = new UserRole();
role2.id = 2;
role2.name = 'role2';
role2.description = 'desc2';

const rolesMock: UserRole[] = [role1, role2];

const permission1 = new UserPermission();
permission1.id = 1;
permission1.name = 'perm1';
permission1.description = 'desc1';

const permission2 = new UserPermission();
permission2.id = 2;
permission2.name = 'perm2';
permission2.description = 'desc2';

const permissionsMock: UserPermission[] = [permission1, permission2];

describe('User rbac tests', () => {
  describe('User roles', () => {
    it('get all roles', async () => {
      findMock.mockReturnValueOnce(Promise.resolve(rolesMock));
      const roles = await userRbacService.getAllRoles();

      expect(roles.length).toEqual(rolesMock.length);
      expect(findMock).toBeCalledTimes(1);
      roles.forEach((role, index) => {
        expect(role).toBeInstanceOf(UserRole);
        expect(role.id).toEqual(rolesMock[index].id);
        expect(role.name).toEqual(rolesMock[index].name);
        expect(role.description).toEqual(rolesMock[index].description);
      });
    });
    it('get one valid role', async () => {
      const roleMock =
        rolesMock[Math.floor(Math.random() + rolesMock.length - 1)];
      findOneMock.mockReturnValueOnce(Promise.resolve(roleMock));

      const role = await userRbacService.getRole(roleMock.id);
      if (!role) {
        fail('Not a valid role');
      }
      expect(role).toBeInstanceOf(UserRole);
      expect(findOneMock).toBeCalledTimes(1);
      expect(role.id).toEqual(roleMock.id);
      expect(role.name).toEqual(roleMock.name);
      expect(role.description).toEqual(roleMock.description);
    });
    it('get invalid role', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(undefined));
      const role = await userRbacService.getRole(
        faker.random.number({ min: 1, max: 10000 }),
      );

      expect(role).toBeUndefined();
      expect(findOneMock).toBeCalledTimes(1);
    });
    it('get all permissions', async () => {
      findMock.mockReturnValueOnce(Promise.resolve(permissionsMock));

      const permissions = await userRbacService.getAllPermissions();

      expect(permissions.length).toEqual(permissionsMock.length);
      expect(findMock).toBeCalledTimes(1);
      permissions.forEach((permission, index) => {
        expect(permission).toBeInstanceOf(UserPermission);
        expect(permission.id).toEqual(permissionsMock[index].id);
        expect(permission.name).toEqual(permissionsMock[index].name);
        expect(permission.description).toEqual(
          permissionsMock[index].description,
        );
      });
    });
    it('get one valid permission', async () => {
      const permissionMock =
        permissionsMock[Math.floor(Math.random() + permissionsMock.length - 1)];
      findOneMock.mockReturnValueOnce(Promise.resolve(permissionMock));

      const permission = await userRbacService.getPermission(permissionMock.id);
      if (!permission) {
        fail('Not a valid permission');
      }
      expect(permission).toBeInstanceOf(UserPermission);
      expect(findOneMock).toBeCalledTimes(1);
      expect(permission.id).toEqual(permissionMock.id);
      expect(permission.name).toEqual(permissionMock.name);
      expect(permission.description).toEqual(permissionMock.description);
    });
    it('get invalid permission', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(undefined));

      const permission = await userRbacService.getPermission(
        faker.random.number({ min: 1, max: 10000 }),
      );

      expect(findOneMock).toBeCalledTimes(1);
      expect(permission).toBeUndefined();
    });
    it('get permissions for one role', async () => {
      const roleId = faker.random.number(3);
      const permissions = await userRbacService.getRolePermissions(1);
      fail('Not implemented!');
    });
    it('the role has a specific permission', async () => {
      getOneMock.mockReturnValueOnce(Promise.resolve({}));
      const roleId = faker.random.number(10000);
      const permissionId = faker.random.number(10000);
      const hasPermission = await userRbacService.hasPermission(
        roleId,
        permissionId,
      );

      expect(hasPermission).toEqual(true);
      expect(getOneMock).toBeCalledTimes(1);
      expect(whereMock).toBeCalledTimes(1);
      expect(
        whereMock,
      ).toBeCalledWith(
        'role_permission.permission_id = :permissionId OR role_permission.role_id = :roleId',
        { permissionId, roleId },
      );
    });
    it('specific permission is not in the role', async () => {
      getOneMock.mockReturnValueOnce(Promise.resolve(undefined));

      const roleId = faker.random.number(10000);
      const permissionId = faker.random.number(10000);
      const hasPermission = await userRbacService.hasPermission(
        roleId,
        permissionId,
      );

      expect(hasPermission).toEqual(false);
      expect(getOneMock).toBeCalledTimes(1);
      expect(whereMock).toBeCalledTimes(1);
      expect(
        whereMock,
      ).toBeCalledWith(
        'role_permission.permission_id = :permissionId OR role_permission.role_id = :roleId',
        { permissionId, roleId },
      );
    });
  });
});
