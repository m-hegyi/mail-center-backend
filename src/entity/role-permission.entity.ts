import {
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { UserPermission } from './user-permission.entity';

@Entity({ name: 'role_permission' })
export class RolePermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => UserRole, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'role_id' })
  role!: UserRole;

  @ManyToOne((type) => UserPermission, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'permission_id' })
  permission!: UserPermission;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
