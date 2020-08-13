import { Entity, Column, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
class BaseEntity {

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'modified_at' })
  modifiedAt!: Date;

  @Column({ name: 'deleted_at' })
  deletedAt?: Date;

}