import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import bcrypt from 'bcryptjs';
import { UserRole } from './user-role.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Company, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @ManyToOne((type) => UserRole, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role?: UserRole;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 100 })
  password!: string;

  @Column({ length: 100, nullable: true, default: null, name: 'icon_url' })
  iconUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
