import { NextFunction, Request, Response } from 'express';

export const adminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.cookies;
};
