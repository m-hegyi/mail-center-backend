import { Entity, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Email } from './email.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'email_tag' })
export class EmailTag {
  @ManyToOne((type) => Email, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'email_id' })
  email?: Email;

  @ManyToOne((type) => Tag, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'tag_id' })
  tag?: Tag;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
