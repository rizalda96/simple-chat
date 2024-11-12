import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessageEntity } from '../entities/chat.entity';
import { UserService } from '../../user/services/user.service';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class ChatService {
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ChatMessageEntity)
    private readonly chatMsgRepository: Repository<ChatMessageEntity>,
  ) {}

  async createMessage(request: CreateMessageDto) : Promise<NullableType<ChatMessageEntity>> {

    // Find the related User entities
    const fromUser = await this.userRepository.findOne({ where: { id: request.fromUserId } });
    const toUser = await this.userRepository.findOne({ where: { id: request.toUserId } });

    if (!fromUser || !toUser) throw new NotFoundException('User not found');
    
    // Create and save the chat message entity
    const chatMessage = this.chatMsgRepository.create({
      fromUser,
      toUser,
      message: request.message,
    });
    
    return await this.chatMsgRepository.save(chatMessage);
  }

  async viewMessages(userId: number): Promise<NullableType<ChatMessageEntity[]>> {
    // const userExists = await this.userRepository.findOne({
    //   where: [
    //     {
    //       username: user.username
    //     },
    //     {
    //       email: user.email
    //     }
    //   ]
    // })

    const messages = await this.chatMsgRepository.find({
      select: {
        message: true,
        createdAt: true,
        fromUser: {
          username: true,
          email: true,
        },
        toUser: {
          username: true,
          email: true,
        },
      },
      where: [
        {
          fromUser: {
            id: userId
          }
        },
      ],
      relations: ['fromUser', 'toUser']
    })

    return messages;
  }
}
