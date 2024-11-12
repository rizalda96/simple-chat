import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserDomain } from '../../user/domain/user.domain';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ChatService } from '../services/chat.service';
import { ChatGateway } from '../chat.gateway';
import { ChatMessageEntity } from '../entities/chat.entity';

@Controller({ path: 'chat', version: '1' })
export class ChatMessageController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('send-message')
  @ResponseMessage('Successfully send message')
  async sendMessage(@Body() request: CreateMessageDto): Promise<any> {    
    await this.chatService.createMessage(request);
    this.chatGateway.server.emit('receiveMessage', request);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('view-messages')
  @ResponseMessage('Successfully get messages')
  async viewMessages(@Request() request: any): Promise<NullableType<ChatMessageEntity[]>> {
    const { id } = request.user;
    return await this.chatService.viewMessages(id);
  }
}
