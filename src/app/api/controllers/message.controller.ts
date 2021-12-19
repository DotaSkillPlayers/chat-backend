import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMessageDto,
  EditMessageDto,
  MessageDto,
  UserDto,
} from '../../../core/dto';
import { eBindings, IMessageService, UseAuth, User } from '../../../core';

@ApiTags('message')
@Controller('message')
export class MessageController {
  @Inject(eBindings.MessageService)
  private service: IMessageService;

  @ApiResponse({ type: MessageDto })
  @Post('/:roomUUID')
  @UseAuth()
  private create(
    @User() user: UserDto,
    @Param('roomUUID', ParseUUIDPipe) roomUUID: string,
    @Body(ValidationPipe) message: CreateMessageDto,
  ): Promise<MessageDto> {
    return this.service.create(user, roomUUID, message);
  }

  @ApiResponse({ type: [MessageDto] })
  @Get('/:roomUUID')
  @UseAuth()
  private getByRoom(
    @User() user: UserDto,
    @Param('roomUUID', ParseUUIDPipe) roomUUID: string,
  ): Promise<MessageDto[]> {
    return this.service.getByRoom(roomUUID, user);
  }

  @ApiResponse({ type: MessageDto })
  @Put('/')
  @UseAuth()
  private edit(
    @User() user: UserDto,
    @Body(ValidationPipe) message: EditMessageDto,
  ): Promise<MessageDto> {
    return this.service.edit(user, message);
  }

  @ApiResponse({ type: MessageDto })
  @Delete('/:messageUUID')
  @UseAuth()
  private delete(
    @User() user: UserDto,
    @Param('messageUUID', ParseUUIDPipe) messageUUID: string,
  ): Promise<MessageDto> {
    return this.service.delete(user, messageUUID);
  }
}
