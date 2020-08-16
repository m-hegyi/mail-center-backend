import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EmailComment } from './email-comment.entity';

@Entity({ name: 'email_comment_attachment' })
export class EmailCommentAttachment {
  @ManyToOne((type) => EmailComment, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: EmailComment;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  path!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
