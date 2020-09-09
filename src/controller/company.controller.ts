import { Request, Response } from 'express';
import * as companyService from '../service/company.service';
import jwt from 'jsonwebtoken';

export const getAll = async (req: Request, res: Response) => {
  const token = req.headers['access-token'];

  const companies = await companyService.listAll();

  res.header(200).json(companies);
};

export const get = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || !parseInt(id, 10)) {
    res.header(400).send('Invalid request');
  }

  const company = await companyService.listOne(parseInt(id, 10));

  res.header(200).send(company);
};
