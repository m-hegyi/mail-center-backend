import { Entity, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EmailComment } from './email-comment.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'email_comment_tag' })
export class EmailCommentTag {
  @ManyToOne((type) => EmailComment, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: EmailComment;

  @ManyToOne((type) => Tag, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'tag_id' })
  tag?: Tag;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
