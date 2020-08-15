import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

@Entity({ name: 'email_category' })
export class EmailCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Company, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, nullable: true, default: null })
  iconUrl?: string;

  @ManyToOne((type) => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'default_user_id' })
  defaultUser?: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
