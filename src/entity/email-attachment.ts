import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Email } from './email.entity';

@Entity({ name: 'email_attachment' })
export class EmailAttachment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Email, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'email_id' })
  email!: Email | null;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  path!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
