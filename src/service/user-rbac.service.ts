import { getRepository } from 'typeorm';
import { UserPermission } from '../entity/user-permission.entity';
import { UserRole } from '../entity/user-role.entity';

const getAllRoles = async (
  withPermissions: boolean = false,
): Promise<UserRole[]> => {
  const roleRepository = await getRepository(UserRole);

  const roles = await roleRepository.find({
    relations: [withPermissions ? 'user_permission' : ''],
  });

  return roles;
};

const getRole = async (
  roleId: number,
  withPermission: boolean = false,
): Promise<UserRole | undefined> => {
  const roleRepository = await getRepository(UserRole);

  const role = await roleRepository.findOne({
    where: { id: roleId },
    relations: [withPermission ? 'user_permission' : ''],
  });

  return role;
};

const getAllPermissions = async (): Promise<UserPermission[]> => {
  const permissionRepository = await getRepository(UserPermission);

  const permissions = await permissionRepository.find();

  return permissions;
};

const getPermission = async (
  permissionId: number,
): Promise<UserPermission | undefined> => {
  const permissionRepository = await getRepository(UserPermission);

  const permission = await permissionRepository.findOne({ id: permissionId });

  return permission;
};

export default {
  getAllRoles,
  getRole,
  getAllPermissions,
  getPermission,
};
