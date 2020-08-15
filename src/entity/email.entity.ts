import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Imap } from './imap.entity';
import { User } from './user.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Company, (company) => company.emails, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @ManyToOne((type) => Imap, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'imap_id' })
  imap?: Imap | null;

  @Column({ name: 'remote_id', length: 100 })
  remoteId!: string;

  // statusId

  // categoryId

  // userID
  @ManyToOne((type) => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
