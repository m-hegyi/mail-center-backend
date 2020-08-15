import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity({ name: 'company_data' })
export class CompanyData {
  @OneToOne((type) => Company, {
    nullable: false,
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @Column({ name: 'contact_email' })
  contactEmail?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ name: 'bill_number', nullable: true })
  billNumber?: string;
}
