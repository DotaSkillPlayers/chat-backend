import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseAuth } from '../../../core';
import { CreateRoomDto, RoomDto } from '../../../core/dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  @UseAuth()
  @Put('join/:roomUUID')
  private join(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): void {}

  @UseAuth()
  @Put('leave/:roomUUID')
  private leave(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): void {}

  @UseAuth()
  @Post('/')
  private create(@Body(ValidationPipe) dto: CreateRoomDto): void {}

  @UseAuth()
  @Delete('/:roomUUID')
  private delete(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): void {}

  @ApiResponse({ type: RoomDto })
  @Get('/:roomUUID')
  private get(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): void {}

  @ApiResponse({ type: [RoomDto] })
  @Get('/')
  private getAll(): void {}
}
