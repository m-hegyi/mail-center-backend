import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { Admin } from '../entity/admin.entity';
import { generateAccessToken } from '../util';
import AdminService from '../service/admin.service';

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).json('Invalid request!');
    return;
  } else {
    try {
      const admin = await AdminService.tryAuth(userName, password);

      const token = generateAccessToken(admin.id, admin.userName);
      res.cookie('Access-Token', token, {
        maxAge: 1800 * 1000,
        httpOnly: true,
      });
      res.status(200).json('OK');
    } catch (err) {
      res.status(401).json('Invalid credentials!');
      return;
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

  if (!validator.isEmail(email)) {
    res
      .status(400)
      .json({ invalidFields: ['email'], msg: 'Invalid email format!' });
    return;
  }

  try {
    const admin = await AdminService.create({ userName, email, password });
    res.status(200).json(admin);
  } catch (err) {
    res
      .status(400)
      .json({ invalidFields: ['userName'], msg: 'Admin already exists!' });
    return;
  }
};
