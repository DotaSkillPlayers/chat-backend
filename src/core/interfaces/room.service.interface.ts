import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { RoomDto, UserDto } from '../dto';

export interface IRoomService {
  subscribe(user: UserDto, uuid: string): Promise<Observable<MessageEvent>>;
  join(user: UserDto, room: string): Promise<RoomDto>;
  leave(user: UserDto, room: string): Promise<RoomDto>;
  getRoom(uuid: string): Promise<RoomDto>;
  isUserInRoom(room: string, user: UserDto): Promise<boolean>;
}
