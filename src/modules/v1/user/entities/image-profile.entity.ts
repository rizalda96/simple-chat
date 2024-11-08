import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";

@Entity('user_images')
export class ImageProfileEntity {
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
    type: 'text',
    name: 'url_image',
  })
  urlImage: string;

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

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({  name: "profile_id" })
  profileId: ProfileEntity[]
}