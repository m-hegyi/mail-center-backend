import { getRepository } from 'typeorm';
import { Admin } from '../entity/admin.entity';
import bcrypt from 'bcryptjs';

const tryAuth = async (userName: string, password: string) => {
  const adminRepository = getRepository(Admin);

  const admin = await adminRepository.findOne({ where: userName });

  if (!admin) {
    throw new Error('Invalid credentials!');
  }

  const valid = bcrypt.compare(password, admin.password);

  if (!valid) {
    throw new Error('Invalid credentials!');
  }

  admin.lastLogin = new Date();
  adminRepository.save(admin);

  return admin;
};

interface ICreateAdminEntity {
  userName: string;
  email: string;
  password: string;
}

const create = async ({
  userName,
  email,
  password,
}: ICreateAdminEntity): Promise<Admin> => {
  const adminRepository = getRepository(Admin);

  const oldAdmin = await adminRepository.findOne({ where: userName });

  if (oldAdmin) {
    throw new Error('Admin already exists!');
  }

  const admin = new Admin();

  admin.userName = userName;
  admin.email = email;
  admin.password = password;

  await adminRepository.save(admin);

  return admin;
};

export default {
  tryAuth,
  create,
};
