import adminService from '../../service/admin.service';
import { Admin } from '../../entity/admin.entity';

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

const adminProps = {
  userName: 'test',
  email: 'test@test.com',
  password: 'test',
};

beforeEach(() => {
  saveMock = jest.fn();
});

describe('Admin service tests', () => {
  describe('Admin service create function test', () => {
    it('create a valid admin', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(null));

      const admin = await adminService.create({ ...adminProps });
      expect(admin).toBeInstanceOf(Admin);
      expect(admin.userName).toBe(adminProps.userName);
      expect(admin.email).toBe(adminProps.email);
      expect(admin.password).toBe(adminProps.password);
      expect(saveMock).toBeCalledTimes(1);
    });

    it('admin already exists', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(new Admin()));
      let error;
      try {
        await adminService.create({ ...adminProps });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Admin already exists!');
      expect(saveMock).toBeCalledTimes(0);
    });
  });
});
