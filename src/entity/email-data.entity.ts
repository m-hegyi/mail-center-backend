import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity({ name: 'email_data' })
export class EmailData {
  @ManyToOne((type) => Email, {
    primary: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'email_id' })
  email!: Email;

  @Column()
  header!: string;

  @Column()
  body!: string;

  @Column()
  status!: string;
}
