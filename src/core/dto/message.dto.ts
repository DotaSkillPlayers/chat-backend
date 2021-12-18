import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class MessageDto {
  @ApiProperty({ example: randomUUID() })
  public uuid: string;

  @ApiProperty({ example: 'cool message content' })
  public content: string;

  @ApiProperty()
  public createdAt: Date;
}
