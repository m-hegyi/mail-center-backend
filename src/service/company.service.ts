import { Company } from '../entity/company.entity';
import { CompanyData } from '../entity/company-data.entity';
import { getRepository } from 'typeorm';

interface ICreateCompany {
  name: string;
  contactEmail: string;
  address: string;
  billNumber: string;
}

export const create = async ({
  name,
  contactEmail,
  address,
  billNumber,
}: ICreateCompany): Promise<Company> => {
  const companyRepository = await getRepository(Company);

  const oldCompany = await companyRepository.findOne({ where: { name } });

  if (oldCompany) {
    throw new Error('Company already exists!');
  }

  const companyData = new CompanyData();
  const company = new Company();

  company.name = name;

  companyData.contactEmail = contactEmail;
  companyData.address = address;
  companyData.billNumber = billNumber;
  company.companyData = companyData;

  await companyRepository.save(company);

  return company;
};

export const listAll = async (): Promise<Company[]> => {
  const companyRepository = await getRepository(Company);

  return await companyRepository.find({ relations: ['companyData'] });
};

export const listOne = async (
  companyId: number,
): Promise<Company | undefined> => {
  const companyRepository = await getRepository(Company);

  return await companyRepository.findOne(companyId, {
    relations: ['companyData'],
  });
};
