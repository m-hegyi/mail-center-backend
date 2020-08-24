import { Company } from '../entity/company.entity';
import { CompanyData } from '../entity/company-data.entity';
import { getRepository } from 'typeorm';

interface ICreateCompany {
  name: string;
  contactEmail: string;
  address: string;
  billNumber: string;
}

const create = async ({
  name,
  contactEmail,
  address,
  billNumber,
}: ICreateCompany): Promise<Company> => {
  const companyRepository = await getRepository(Company);
  const companyDataRepository = await getRepository(CompanyData);

  const companyData = new CompanyData();
  const company = new Company();

  company.name = name;

  companyData.contactEmail = contactEmail;
  companyData.address = address;
  companyData.billNumber = billNumber;
  company.companyData = companyData;

  companyRepository.save(company);
  companyDataRepository.save(companyData);

  return company;
};

export default {
  create,
};
