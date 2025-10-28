import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessagesService } from './messages.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  async sendMessage(
    @CurrentUser() user: any,
    @Body() body: { receiverId: string; content: string },
  ) {
    return this.messagesService.sendMessage(user.id, body.receiverId, body.content);
  }

  @Get('conversations')
  async getUserConversations(@CurrentUser() user: any) {
    return this.messagesService.getUserConversations(user.id);
  }

  @Get('conversation/:userId')
  async getConversation(@CurrentUser() user: any, @Param('userId') otherUserId: string) {
    return this.messagesService.getConversation(user.id, otherUserId);
  }

  @Put(':id/read')
  async markAsRead(@Param('id') messageId: string) {
    return this.messagesService.markAsRead(messageId);
  }
}

