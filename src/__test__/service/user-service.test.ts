import userService from '../../service/user.service';
import { User } from '../../entity/user.entity';

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
  ManyToOne: jest.fn(),
  OneToOne: jest.fn(),
  JoinColumn: jest.fn(),
  OneToMany: jest.fn(),
}));

beforeEach(() => {
  findOneMock = jest.fn();
  saveMock = jest.fn();
});

const userProps = {
  userName: 'test_user',
  email: 'test@company.com',
  password: 'test1234',
};

describe('User service tests', () => {
  describe('User create tests', () => {
    it('Create an user with valid data', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(null));

      const user = await userService.create({ ...userProps });
      expect(user).toBeInstanceOf(User);
      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith({ email: userProps.email });
      expect(saveMock).toBeCalledTimes(1);
      expect(user.userName).toEqual(userProps.userName);
      expect(user.email).toEqual(userProps.email);
      expect(user.password).toEqual(userProps.password);
    });

    it('Create an user but email already exists', async () => {
      findOneMock.mockReturnValueOnce(Promise.resolve(new User()));

      let error;
      try {
        await userService.create({ ...userProps });
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('This email is already in use!');
      expect(saveMock).toBeCalledTimes(0);
      expect(findOneMock).toBeCalledTimes(1);
      expect(findOneMock).toBeCalledWith({ email: userProps.email });
    });
  });
});
