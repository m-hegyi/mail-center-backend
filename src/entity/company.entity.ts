import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('company')
class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 256 })
  name!: string;

  @Column({ type: 'timestamp', nullable: false})
  createdAt!: Date;

  @Column({ type: 'timestamp', default: Date.now() })
  modifiedAt!: Date;

  @Column()
  deletedAt?: Date;

} 