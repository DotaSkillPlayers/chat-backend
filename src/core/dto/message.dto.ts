import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { UserDto } from './user.dto';

export class MessageDto {
  constructor(uuid: string, content: string, createdAt: Date, author: UserDto) {
    this.uuid = uuid;
    this.content = content;
    this.createdAt = createdAt;
    this.author = author;
  }

  @ApiProperty({ example: randomUUID() })
  public uuid: string;

  @ApiProperty({ example: 'cool message content' })
  public content: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty({ type: UserDto })
  public author: UserDto;
}
