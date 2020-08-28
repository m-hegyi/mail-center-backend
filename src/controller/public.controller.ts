import { Request, Response } from 'express';
import companyService from '../service/company.service';
import { Company } from '../entity/company.entity';
import { User } from '../entity/user.entity';
import userService from '../service/user.service';

export const register = async (req: Request, res: Response) => {
  const {
    contactEmail,
    userName,
    email,
    password,
    companyName,
    address,
    billNumber,
  } = req.body;

  let hasError = false;
  const invalidFields = [];

  if (!contactEmail) {
    hasError = true;
    invalidFields.push('contactEmail');
  }

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

  if (!companyName) {
    hasError = true;
    invalidFields.push('companyName');
  }

  if (hasError) {
    res.header(400).json({ invalidFields, msg: 'Invalid input(s)!' });
    return;
  }

  let company: Company;
  let user: User;
  try {
    company = await companyService.create({
      name: companyName,
      contactEmail,
      address: address ?? '',
      billNumber: billNumber ?? '',
    });
  } catch (e) {
    res.header(400).json({ msg: e.message });
    return;
  }

  try {
    user = await userService.create({
      userName,
      email,
      password,
      companyId: company.id,
    });
  } catch (e) {
    res.header(400).json({ msg: e.message });
    return;
  }

  res.header(201).json({ user, company });
};
