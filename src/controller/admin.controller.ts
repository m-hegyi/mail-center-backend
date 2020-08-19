import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Admin } from '../entity/admin.entity';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../util';

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json('Invalid request!');
    return;
  } else {
    const adminRepository = await getRepository(Admin);
    const admin = await adminRepository.findOne({ where: { name } });

    if (!admin) {
      res.status(401).json('Invalid credentials!');
      return;
    } else {
      const valid = await bcrypt.compare(password, admin.password);

      if (!valid) {
        res.status(401).json('Invalid credentials!');
        return;
      }

      // handle admin last login
      admin.lastLogin = new Date();
      adminRepository.save(admin);

      const token = generateAccessToken(admin.id, admin.name);
      res.cookie('Access-Token', token, {
        maxAge: 1800 * 1000,
        httpOnly: true,
      });
      res.status(200).json('OK');
    }
  }
};

export const create = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const errors = [];
  let hasError = false;

  if (!name) {
    hasError = true;
    errors.push('name');
  }

  if (!password) {
    hasError = true;
    errors.push('password');
  }

  if (hasError) {
    res.status(400).json({ invalidFields: errors, msg: 'Invalid input(s)!' });
    return;
  }

  const adminRepository = getRepository(Admin);

  const admin = await adminRepository.findOne({ where: { name } });

  if (admin) {
    res
      .status(400)
      .json({ invalidFields: ['name'], msg: 'Admin already exists!' });
    return;
  }

  const newAdmin = new Admin();

  newAdmin.name = name;
  newAdmin.password = password;

  await adminRepository.save(newAdmin);

  res.status(200).json(newAdmin);
};
