import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  private content: string;
}
