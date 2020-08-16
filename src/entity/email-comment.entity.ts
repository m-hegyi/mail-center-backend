import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Email } from './email.entity';
import { User } from './user.entity';

@Entity({ name: 'email_comment' })
export class EmailComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => Email, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'email_id' })
  email?: Email;

  @ManyToOne((type) => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @Column({ length: 100 })
  title!: string;

  @Column({ type: 'text' })
  body!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
