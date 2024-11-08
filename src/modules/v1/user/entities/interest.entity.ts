import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('user_interests')
export class InterestEntity {
  @PrimaryGeneratedColumn()
  @Index({ unique: true })
  @Column({
    type: 'bigint',
    name: 'id',
    generated: 'increment',
    nullable: false,
    primary: true
  })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({  name: "user_id" })
  user: UserEntity

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;

  @CreateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}