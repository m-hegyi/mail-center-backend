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
    const admin = await getRepository(Admin).findOne({ where: { name } });

    if (!admin) {
      res.status(401).json('Invalid credentials!');
      return;
    } else {
      const valid = await bcrypt.compare(password, admin.password);

      if (!valid) {
        res.status(401).json('Invalid credentials!');
        return;
      }

      const token = generateAccessToken(admin.id, admin.name);
      res.cookie('Access-Token', token, {
        maxAge: 1800 * 1000,
        httpOnly: true,
      });
      res.status(200).json('OK');
    }
  }
};
