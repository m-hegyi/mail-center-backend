import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Imap } from './imap.entity';

@Entity({ name: 'imap_user' })
export class ImapUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((type) => Imap, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'imap_id' })
  imap?: Imap;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  password!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  setPassword(password: string) {
    this.password = Buffer.from(password).toString('base64');
  }
}
