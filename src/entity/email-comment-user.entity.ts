import { Entity, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { EmailComment } from './email-comment.entity';

@Entity({ name: 'email_comment_user' })
export class EmailCommentUser {
  @ManyToOne((type) => EmailComment, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: EmailComment;

  @ManyToOne((type) => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
