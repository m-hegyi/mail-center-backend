import { Request, Response } from 'express';
import { login } from '../../controller/admin.controller';

let findOneMock = jest.fn();

jest.mock('typeorm', () => ({
  getRepository: () => ({
    findOne: findOneMock,
  }),
  PrimaryGeneratedColumn: jest.fn(),
  Entity: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  BeforeInsert: jest.fn(),
}));

const req = {} as Request;
const res = {} as Response;

beforeEach(() => {
  req.body = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  findOneMock = jest.fn();
});

describe('Admin controller tests', () => {
  describe('Admin login function test', () => {
    it('without user, password or both should response with 400 and invalid response', async () => {
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Invalid request!');

      req.body = { user: 'test' };
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Invalid request!');

      req.body = { password: 'test' };
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Invalid request!');

      expect(res.status).toHaveBeenCalledTimes(3);
      expect(res.json).toHaveBeenCalledTimes(3);
    });

    it('with correct data without user', async () => {
      req.body = {
        name: 'test',
        password: 'test',
      };

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith('Invalid credentials!');
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    it('with correct data with user', async () => {
      const inputOptions = {
        name: 'test',
        password: 'test',
      };
      req.body = inputOptions;

      findOneMock = jest.fn().mockReturnValue({ ...inputOptions });

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ ...inputOptions });
    });
  });
});
