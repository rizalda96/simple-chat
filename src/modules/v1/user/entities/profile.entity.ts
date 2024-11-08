import { Gender } from "src/constant/enum.gender";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ImageProfileEntity } from "./image-profile.entity";

@Entity('user_profile')
export class ProfileEntity {
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
    name: 'fullname',
    nullable: true,
    length: 100
  })
  fullname: string;

  @Column({
    type: 'enum',
    enum: Gender,
    name: 'gender',
    nullable: true,
  })
  gender: string;

  @Column({
    type: 'date',
    name: 'birthDay',
    nullable: true
  })
  birthDay: Date;

  @Column({
    type: 'varchar',
    name: 'holoscope',
    nullable: true,
    length: 50,
  })
  holoscope: string;

  @Column({
    type: 'varchar',
    name: 'zodiac',
    nullable: true,
    length: 50,
  })
  zodiac: string;

  @Column({
    type: 'integer',
    name: 'height',
    nullable: true
  })
  height: number;

  @Column({
    type: 'integer',
    name: 'weight',
    nullable: true
  })
  weight: number;

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


  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({  name: "user_id" })
  user: UserEntity;

  @OneToMany(() => ImageProfileEntity, (image) => image.profileId)
  images: ImageProfileEntity[]
}