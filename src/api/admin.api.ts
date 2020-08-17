import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/login', (req: Request, res: Response) => {
  const { user, password } = req.body;

  if (!user || !password) {
    res.status(400).json('Invalid reques!');
    return;
  }
});
