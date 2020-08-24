import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Imap } from './imap.entity';
import { Email } from './email.entity';
import { CompanyData } from './company-data.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @OneToMany((type) => Imap, (imap) => imap.company)
  imaps?: Imap[];

  @OneToMany((type) => Email, (email) => email.company)
  emails?: Email[];

  @OneToOne((type) => CompanyData, (companyData) => companyData.company, {
    cascade: true,
  })
  companyData?: CompanyData;
}
