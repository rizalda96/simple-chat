import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
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

  @Column({
    type: 'varchar',
    name: 'username',
    unique: true,
    nullable: false,
    length: 50
  })
  username: string;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
    nullable: false,
    length: 50
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'password',
    nullable: false
  })
  password: string;

  @Column({
    type: 'timestamp',
    name: 'last_login',
    nullable: true,
  })
  lastLogin: Date;

  @Column({
    type: 'boolean',
    name: 'is_active',
    nullable: false,
    default: () => 'true'
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    name: 'remember_token',
    nullable: true
  })
  rememberToken: string;

  @CreateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => Date.now()
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Column({
    type: 'timestamp',
    name: 'updated_at',
    nullable: false,
    default: () => Date.now()
  })
  updatedAt: Date;
}
