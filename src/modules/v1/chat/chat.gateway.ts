import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  WebSocketServer, 
  OnGatewayDisconnect, 
  OnGatewayConnection, 
  OnGatewayInit,
  ConnectedSocket
} from '@nestjs/websockets';
import { ChatService } from './services/chat.service';
import { Server, Socket } from 'socket.io';
import { SendMessageDto } from './dto/send-message.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*' }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly chatService: ChatService) {}
  
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

}
