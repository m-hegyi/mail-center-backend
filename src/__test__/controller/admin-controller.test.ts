import { Request, Response } from 'express';
import { login, create } from '../../controller/admin.controller';

let findOneMock = jest.fn();
let saveMock = jest.fn();

jest.mock('typeorm', () => ({
  getRepository: () => ({
    findOne: findOneMock,
    save: saveMock,
  }),
  PrimaryGeneratedColumn: jest.fn(),
  Entity: jest.fn(),
  Column: jest.fn(),
  CreateDateColumn: jest.fn(),
  UpdateDateColumn: jest.fn(),
  BeforeInsert: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compare: (param1: string, param2: string) => param1 === param2,
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn((param) => param),
}));

const req = {} as Request;
const res = {} as Response;

beforeEach(() => {
  req.body = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  findOneMock = jest.fn();
  saveMock = jest.fn();
});

describe('Admin controller tests', () => {
  describe('Admin login function test', () => {
    it('without user, email, password or both should response with 400 and invalid response', async () => {
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith('Invalid request!');

      req.body = { userName: 'test' };
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
        userName: 'test',
        password: 'test',
      };

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith('Invalid credentials!');
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
    });

    it('with valid user but wrong password', async () => {
      const inputOptions = {
        userName: 'test',
        password: 'test',
      };
      req.body = inputOptions;

      findOneMock = jest
        .fn()
        .mockReturnValue({ ...inputOptions, password: 'not-test' });

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith('Invalid credentials!');
    });

    it('with correct data with user', async () => {
      const inputOptions = {
        userName: 'test',
        password: 'test',
      };
      req.body = inputOptions;

      const dbResult = {
        ...inputOptions,
        id: 1,
      };

      findOneMock = jest.fn().mockReturnValue({ ...dbResult });

      const date = new Date();
      saveMock = jest.fn(() => date);

      await login(req, res);
      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveReturnedWith(date);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith('OK');
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledWith(
        'Access-Token',
        {
          id: dbResult.id,
          userName: dbResult.userName,
        },
        { httpOnly: true, maxAge: 1800 * 1000 },
      );
    });
  });

  describe('Admin create function test', () => {
    it('Create a valid admin with username, email and password', async () => {
      const admin = {
        userName: 'test',
        email: 'test@mycompany.com',
        password: 'test',
      };

      req.body = admin;

      saveMock = jest.fn().mockReturnValue(Promise.resolve({ ...admin }));

      await create(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({ ...admin });
    });

    it('Trying to create an admin without name', async () => {
      const admin = {
        password: 'test',
      };

      req.body = admin;

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        invalidFields: ['userName', 'email'],
        msg: 'Invalid input(s)!',
      });
    });

    it('Trying to create an admin without email', async () => {
      const admin = {
        userName: 'test',
        password: 'test',
      };

      req.body = admin;

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        invalidFields: ['email'],
        msg: 'Invalid input(s)!',
      });
    });

    it('Trying to create an admin without password', async () => {
      const admin = {
        userName: 'test',
      };

      req.body = admin;

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        invalidFields: ['email', 'password'],
        msg: 'Invalid input(s)!',
      });
    });

    it('Trying to create an admin without name, email and password', async () => {
      const admin = {};

      req.body = admin;

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        invalidFields: ['userName', 'email', 'password'],
        msg: 'Invalid input(s)!',
      });
    });

    it('Trying to create an admin that already exists', async () => {
      const admin = {
        userName: 'test',
        email: 'test@mycompany.com',
        password: 'test',
      };

      req.body = admin;

      findOneMock = jest.fn().mockReturnValue({ ...admin });

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.status).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        invalidFields: ['userName'],
        msg: 'Admin already exists!',
      });
    });

    it('Trying to creat an admin with invalid email format', async () => {
      const admin = {
        userName: 'test',
        email: 'notanEmail.com@',
        password: 'test',
      };

      req.body = admin;

      await create(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({
        invalidFields: ['email'],
        msg: 'Invalid email format!',
      });
    });
  });
});
