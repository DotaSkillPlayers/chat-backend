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
  Sse,
  ValidationPipe,
  MessageEvent,
  UseFilters,
  UnauthorizedException,
  Header,
  Req,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { eBindings, IRoomService, UseAuth, User } from '../../../core';
import { CreateRoomDto, RoomDto, UserDto } from '../../../core/dto';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

@ApiTags('room')
@Controller('room')
export class RoomController {
  @Inject(eBindings.RoomService)
  private roomService: IRoomService;

  @Sse('subscribe/:roomUUID/')
  private subscribe(
    @Query('auth') auth: string,
    @Param('roomUUID', ParseUUIDPipe)
    uuid: string,
  ): Promise<Observable<MessageEvent>> {
    const { id, login } = jwt.verify(auth, process.env.JWT_SECRET) as UserDto;
    if (!id || !login) {
      throw new UnauthorizedException();
    }
    return this.roomService.subscribe(new UserDto(id, login), uuid);
  }

  @ApiResponse({ type: RoomDto })
  @UseAuth()
  @Put('join/:roomUUID')
  private join(
    @User() user: UserDto,
    @Param('roomUUID', ParseUUIDPipe) roomUUID: string,
  ): unknown {
    return this.roomService.join(user, roomUUID);
  }

  @ApiResponse({ type: RoomDto })
  @UseAuth()
  @Put('leave/:roomUUID')
  private leave(
    @User() user: UserDto,
    @Param('roomUUID', ParseUUIDPipe) roomUUID: string,
  ): unknown {
    return this.roomService.leave(user, roomUUID);
  }

  @UseAuth()
  @Post('/')
  private create(@Body(ValidationPipe) dto: CreateRoomDto): void {
    throw new UnauthorizedException();
  }

  @UseAuth()
  @Delete('/:roomUUID')
  private delete(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): void {
    throw new UnauthorizedException();
  }

  @ApiResponse({ type: RoomDto })
  @Get('/:roomUUID')
  private get(@Param('roomUUID', ParseUUIDPipe) roomUUID: string): unknown {
    console.log('get rooms');
    return this.roomService.getRoom(roomUUID);
  }
}
