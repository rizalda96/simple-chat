import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProfileEntity } from "./profile.entity";
import { InterestEntity } from "./interest.entity";
import { ImageProfileEntity } from "./image-profile.entity";
import { ChatMessageEntity } from "../../chat/entities/chat.entity";

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

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile: ProfileEntity;

  @OneToMany(() => InterestEntity, (interest) => interest.user)
  interest: InterestEntity;

  @OneToMany(() => ImageProfileEntity, (image) => image.userId)
  imageProfile: ImageProfileEntity;

  @OneToMany(() => ChatMessageEntity, (chatMessage) => chatMessage.fromUser)
  chatMessagesSent: ChatMessageEntity[];

  @OneToMany(() => ChatMessageEntity, (chatMessage) => chatMessage.toUser)
  chatMessagesReceived: ChatMessageEntity[];
}
