import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { EmailCategory } from './email-category.entity';

@Entity({ name: 'email_category_event' })
export class EmailCategoryEvent {
  // categoryId
  @ManyToOne((type) => EmailCategory, {
    onDelete: 'CASCADE',
    primary: true,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category!: EmailCategory;

  //userId
  @ManyToOne((type) => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @Column()
  type!: string;

  @Column()
  oldValue?: string;

  @Column()
  newValue?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
