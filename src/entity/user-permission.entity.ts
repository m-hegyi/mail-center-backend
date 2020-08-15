import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'user_permission' })
export class UserPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => UserRole, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'role_id' })
  role!: UserRole | null;

  @Column()
  name!: string;

  @Column()
  description!: string;
}
