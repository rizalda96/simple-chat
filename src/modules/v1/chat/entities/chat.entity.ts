import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity('chat_messages')
export class ChatMessageEntity {
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
    name: 'message',
  })
  message: string;

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

  @ManyToOne(() => UserEntity, (user) => user.chatMessagesSent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_user_id' })
  fromUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.chatMessagesReceived, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_user_id' })
  toUser: UserEntity;
}
