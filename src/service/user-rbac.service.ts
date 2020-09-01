import { getRepository } from 'typeorm';
import { UserPermission } from '../entity/user-permission.entity';
import { UserRole } from '../entity/user-role.entity';
import { RolePermission } from '../entity/role-permission.entity';

const getAllRoles = async (
  withPermissions: boolean = false,
): Promise<UserRole[]> => {
  const roleRepository = getRepository(UserRole);

  const roles = await roleRepository.find({
    relations: [withPermissions ? 'user_permission' : ''],
  });

  return roles;
};

const getRole = async (
  roleId: number,
  withPermission: boolean = false,
): Promise<UserRole | undefined> => {
  const roleRepository = getRepository(UserRole);

  const role = await roleRepository.findOne({
    where: { id: roleId },
    relations: [withPermission ? 'user_permission' : ''],
  });

  return role;
};

const getAllPermissions = async (): Promise<UserPermission[]> => {
  const permissionRepository = getRepository(UserPermission);

  const permissions = await permissionRepository.find();

  return permissions;
};

const getPermission = async (
  permissionId: number,
): Promise<UserPermission | undefined> => {
  const permissionRepository = getRepository(UserPermission);

  const permission = await permissionRepository.findOne({ id: permissionId });

  return permission;
};

const getRolePermissions = async (roleId: number): Promise<any> => {
  const rolePermissionRepository = getRepository(RolePermission);

  const rolePerimssions = await rolePermissionRepository.find({
    where: { role: { id: roleId } },
  });

  return rolePerimssions.map((rolePerm) => rolePerm.permission);
};
const hasPermission = async (
  roleId: number,
  permissionId: number,
): Promise<boolean> => {
  const rolePermissionRepository = getRepository(RolePermission);
  const response = await rolePermissionRepository
    .createQueryBuilder('role_permission')
    .where(
      'role_permission.permission_id = :permissionId OR role_permission.role_id = :roleId',
      { permissionId, roleId },
    )
    .getOne();

  if (!response) {
    return false;
  }

  return true;
};

export default {
  getAllRoles,
  getRole,
  getAllPermissions,
  getPermission,
  hasPermission,
  getRolePermissions,
};
