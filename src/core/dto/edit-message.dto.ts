import { CreateMessageDto } from './create-message.dto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class EditMessageDto extends CreateMessageDto {
  @ApiProperty({ example: randomUUID() })
  @IsUUID()
  public uuid: string;
}
