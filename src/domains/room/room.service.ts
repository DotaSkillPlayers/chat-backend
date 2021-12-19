import {
  BadRequestException,
  Injectable,
  MessageEvent,
  UnauthorizedException,
} from '@nestjs/common';
import { IRoomService } from '../../core';
import { fromEvent, Observable } from 'rxjs';
import { EventEmitter2 } from 'eventemitter2';
import { MessageDto, RoomDto, UserDto } from '../../core/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class RoomService implements IRoomService {
  private ee = new EventEmitter2();

  @InjectRepository(RoomRepository)
  private repo: RoomRepository;

  @OnEvent('message.created')
  private messageCreated(room: string, message: MessageDto): void {
    this.ee.emit(room, { data: { message, type: 'created' } });
  }

  @OnEvent('message.deleted')
  private messageDeleted(room: string, message: MessageDto): void {
    this.ee.emit(room, { data: { message, type: 'deleted' } });
  }

  @OnEvent('message.edited')
  private messageEdited(room: string, message: MessageDto): void {
    this.ee.emit(room, { data: { message, type: 'edited' } });
  }

  public subscribe(
    user: UserDto,
    uuid: string,
  ): Promise<Observable<MessageEvent>> {
    return this.isUserInRoom(uuid, user).then((r) => {
      if (r) {
        return fromEvent<MessageEvent>(this.ee, uuid);
      }
      throw new UnauthorizedException();
    });
  }

  public async join(user: UserDto, uuid: string): Promise<RoomDto> {
    const room = await this.repo.findOne({
      where: { uuid },
    });
    if (!room) {
      throw new BadRequestException(`Room ${uuid} does not exist`);
    }

    const isInRoom = await this.repo.isUserInRoom(uuid, user.id);
    if (isInRoom) {
      throw new BadRequestException(
        `User is already a participant of the room`,
      );
    }
    await this.repo.joinRoom(uuid, user.id);
    return new RoomDto(room.uuid, room.name, 0);
  }

  public async leave(user: UserDto, uuid: string): Promise<RoomDto> {
    const room = await this.repo.findOne({
      where: { uuid },
    });
    if (!room) {
      throw new BadRequestException(`Room ${uuid} does not exist`);
    }

    const isInRoom = await this.repo.isUserInRoom(uuid, user.id);
    if (!isInRoom) {
      throw new BadRequestException(`User not a participant of the room`);
    }
    await this.repo.leaveRoom(uuid, user.id);
    return new RoomDto(room.uuid, room.name, 0);
  }

  public getRoom(uuid: string): Promise<RoomDto> {
    return this.repo
      .getRoom(uuid)
      .then(([room, users]) => new RoomDto(room.uuid, room.name, users));
  }

  public isUserInRoom(room: string, user: UserDto): Promise<boolean> {
    return this.repo.isUserInRoom(room, user.id);
  }
}
