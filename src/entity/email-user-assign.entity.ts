import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Email } from './email.entity';
import { User } from './user.entity';

@Entity({ name: 'email_user_assign' })
export class EmailUserAssign {
  @ManyToOne((type) => Email, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'email_id' })
  email?: Email;

  @ManyToOne((type) => User, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  // assignedby
  @ManyToOne((type) => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_by' })
  assignedBy?: User | null;

  @Column({ name: 'auto_assign', default: null, nullable: true })
  autoAssign!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
