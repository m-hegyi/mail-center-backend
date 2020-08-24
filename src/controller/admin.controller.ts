import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { Admin } from '../entity/admin.entity';
import { generateAccessToken } from '../util';

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).json('Invalid request!');
    return;
  } else {
    const adminRepository = await getRepository(Admin);
    const admin = await adminRepository.findOne({ where: { userName } });

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

      const token = generateAccessToken(admin.id, admin.userName);
      res.cookie('Access-Token', token, {
        maxAge: 1800 * 1000,
        httpOnly: true,
      });
      res.status(200).json('OK');
    }
  }
};

export const create = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const invalidFields = [];
  let hasError = false;

  if (!userName) {
    hasError = true;
    invalidFields.push('userName');
  }

  if (!email) {
    hasError = true;
    invalidFields.push('email');
  }

  if (!password) {
    hasError = true;
    invalidFields.push('password');
  }

  if (hasError) {
    res.status(400).json({ invalidFields, msg: 'Invalid input(s)!' });
    return;
  }

  const adminRepository = getRepository(Admin);

  if (!validator.isEmail(email)) {
    res
      .status(400)
      .json({ invalidFields: ['email'], msg: 'Invalid email format!' });
    return;
  }

  const admin = await adminRepository.findOne({ where: { userName } });

  if (admin) {
    res
      .status(400)
      .json({ invalidFields: ['userName'], msg: 'Admin already exists!' });
    return;
  }

  const newAdmin = new Admin();

  newAdmin.userName = userName;
  newAdmin.email = email;
  newAdmin.password = password;

  await adminRepository.save(newAdmin);

  res.status(200).json(newAdmin);
};
