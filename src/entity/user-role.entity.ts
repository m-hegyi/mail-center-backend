import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user_role' })
export class UserRole {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;
}
