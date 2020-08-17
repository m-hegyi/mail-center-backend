import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Admin } from '../entity/admin.entity';
import { Controller } from '../util/decorator/index.decorator';

// @Controller('admin')
// export class AdminController {
//   async login() {}
// }

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json('Invalid request!');
    return;
  }

  if (name) {
    const admin = await getRepository(Admin).findOne({ where: { name } });

    if (!admin) {
      res.status(401).json('Invalid credentials!');
      return;
    }

    res.status(200).json(admin);
  }
};
