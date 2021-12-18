import {
  Body,
  Controller,
  Delete,
  Get,
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
} from '../../../core/dto';
import { UseAuth } from '../../../core';

@ApiTags('message')
@Controller('message')
export class MessageController {
  @Post('/:roomUUID')
  @UseAuth()
  private send(
    @Param('roomUUID', ParseUUIDPipe) roomUUID: string,
    @Body(ValidationPipe) message: CreateMessageDto,
  ): unknown {
    return null;
  }

  @ApiResponse({ type: [MessageDto] })
  @Get('/:roomUUID')
  @UseAuth()
  private get(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): unknown {
    return null;
  }

  @Put('/:messageUUID')
  @UseAuth()
  private edit(
    @Param('messageUUID', ParseUUIDPipe) messageUUID: string,
    @Body(ValidationPipe) dto: EditMessageDto,
  ): void {}

  @ApiResponse({ type: MessageDto })
  @Delete('/:messageUUID')
  @UseAuth()
  private delete(
    @Param('messageUUID', ParseUUIDPipe) messageUUID: string,
  ): void {}
}
