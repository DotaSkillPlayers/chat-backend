import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { eBindings, IMessageService, IRoomService } from '../../core';
import { MessageRepository } from './mesage.repository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMessageDto,
  EditMessageDto,
  MessageDto,
  UserDto,
} from '../../core/dto';
import { MessageEntity, RoomEntity, UserEntity } from '../../entities';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MessageService implements IMessageService {
  @Inject()
  private ee: EventEmitter2;

  @InjectRepository(MessageRepository)
  private repo: MessageRepository;

  @Inject(eBindings.RoomService)
  private roomService: IRoomService;

  private async checkRoom(room: string, user: UserDto): Promise<void> {
    await this.roomService.isUserInRoom(room, user).then((r) => {
      if (!r) {
        throw new BadRequestException(`The user is not is the room`);
      }
    });
  }

  public async create(
    user: UserDto,
    room: string,
    dto: CreateMessageDto,
  ): Promise<MessageDto> {
    await this.checkRoom(room, user);
    const message = new MessageEntity();
    message.author = { id: user.id } as UserEntity;
    message.content = dto.content;
    message.room = { uuid: room } as RoomEntity;
    return this.repo.save(message).then(({ uuid, content, createdAt }) => {
      const message = new MessageDto(uuid, content, createdAt, user);
      this.ee.emit('message.created', room, message);
      return message;
    });
  }

  public async delete(user: UserDto, uuid: string): Promise<MessageDto> {
    const message = await this.repo.findOne({
      where: { uuid, author: { id: user.id } },
      relations: ['room'],
    });
    if (!message) {
      throw new UnauthorizedException();
    }
    await this.repo.delete({ uuid: message.uuid });
    const { content, createdAt, room } = message;
    const dto = new MessageDto(uuid, content, createdAt, user);
    this.ee.emit('message.deleted', room.uuid, dto);
    return dto;
  }

  public async edit(user: UserDto, dto: EditMessageDto): Promise<MessageDto> {
    const message = await this.repo.findOne({
      where: {
        uuid: dto.uuid,
        author: { id: user.id },
      },
      relations: ['room'],
    });
    if (!message) {
      throw new UnauthorizedException();
    }
    message.content = dto.content;
    return this.repo
      .save(message)
      .then(({ uuid, content, createdAt, room }) => {
        const message = new MessageDto(uuid, content, createdAt, user);
        this.ee.emit('message.edited', room.uuid, message);
        return message;
      });
  }

  public async getByRoom(room: string, user: UserDto): Promise<MessageDto[]> {
    await this.checkRoom(room, user);
    return this.repo
      .find({ where: { room: { uuid: room } }, relations: ['author'] })
      .then((r) =>
        r.map(
          ({ uuid, content, createdAt, author: { id, login } }) =>
            new MessageDto(uuid, content, createdAt, new UserDto(id, login)),
        ),
      );
  }
}
