import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatMessageController } from './controllers/chat-message.controller';
import { ChatMessageEntity } from './entities/chat.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatMessageEntity, UserEntity]),
  ],
  controllers: [ChatMessageController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
