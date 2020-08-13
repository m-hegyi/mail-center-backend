import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import bcrypt from "bcryptjs";

@Entity({ name: 'admin' })
export class Admin {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ name: 'last_login' })
  lastLogin!: Date;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean = false;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

}