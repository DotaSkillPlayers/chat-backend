import { CreateMessageDto, EditMessageDto, MessageDto, UserDto } from '../dto';

export interface IMessageService {
  create(
    user: UserDto,
    room: string,
    message: CreateMessageDto,
  ): Promise<MessageDto>;
  getByRoom(room: string, user: UserDto): Promise<MessageDto[]>;
  edit(user: UserDto, message: EditMessageDto): Promise<MessageDto>;
  delete(user: UserDto, uuid: string): Promise<MessageDto>;
}
