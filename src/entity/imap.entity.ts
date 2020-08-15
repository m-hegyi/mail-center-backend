import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { ImapUser } from './imap-user.entity';

@Entity({ name: 'imap' })
export class Imap {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Company, (company) => company.imaps, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column()
  host!: string;

  @Column()
  port!: number;

  @Column({ name: 'is_secure', default: true })
  isSecure!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
