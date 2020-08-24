import companyService from '../../service/company.service';
import { Company } from '../../entity/company.entity';
import { CompanyData } from '../../entity/company-data.entity';

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
  saveMock = jest.fn();
  findOneMock = jest.fn();
});

const createCompanyProps = {
  name: 'Test company',
  contactEmail: 'contact@testcompany.com',
  address: '1000, Budapest Kossuth 1',
  billNumber: '',
};

describe('Company service tests', () => {
  it('Create a company', async () => {
    const company = await companyService.create({ ...createCompanyProps });

    expect(saveMock).toBeCalledTimes(1);
    expect(company).toBeInstanceOf(Company);
    expect(company.companyData).toBeInstanceOf(CompanyData);
    expect(company.name).toEqual(createCompanyProps.name);
    expect(company.companyData?.address).toEqual(createCompanyProps.address);
    expect(company.companyData?.billNumber).toEqual(
      createCompanyProps.billNumber,
    );
    expect(company.companyData?.contactEmail).toEqual(
      createCompanyProps.contactEmail,
    );
  });
  it('Create a company but already registered', async () => {
    findOneMock.mockReturnValueOnce(new Company());

    let error;

    try {
      await companyService.create({ ...createCompanyProps });
    } catch (e) {
      error = e;
    }

    expect(saveMock).toBeCalledTimes(0);
    expect(findOneMock).toBeCalledTimes(1);
    expect(error).toBeInstanceOf(Error);
    expect(error).toEqual(new Error('Company already exists!'));
  });
});
