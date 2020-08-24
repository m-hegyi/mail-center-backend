import userService from '../../service/user.service';
import { User } from '../../entity/user.entity';
import { Company } from '../../entity/company.entity';
import Faker from 'faker';

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
  userName: Faker.internet.userName(),
  email: Faker.internet.email(),
  password: Faker.internet.password(),
  companyId: Faker.random.number(),
};

describe('User service tests', () => {
  describe('User create tests', () => {
    it('Create an user with valid data', async () => {
      findOneMock
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(new Company());

      const user = await userService.create({ ...userProps });
      expect(user).toBeInstanceOf(User);
      expect(findOneMock).toBeCalledTimes(2);
      expect(findOneMock).toHaveBeenNthCalledWith(1, {
        where: { email: userProps.email },
      });
      expect(findOneMock).toHaveBeenLastCalledWith({
        where: { id: userProps.companyId },
      });
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
      expect(findOneMock).toBeCalledWith({ where: { email: userProps.email } });
    });

    it('Create an user but the company is invalid', async () => {
      findOneMock
        .mockReturnValueOnce(Promise.resolve(null))
        .mockReturnValueOnce(Promise.resolve(null));

      let error;
      try {
        await userService.create({ ...userProps });
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual('Not a valid company!');
      expect(saveMock).toBeCalledTimes(0);
      expect(findOneMock).toHaveBeenLastCalledWith({
        where: { id: userProps.companyId },
      });
    });
  });
});
