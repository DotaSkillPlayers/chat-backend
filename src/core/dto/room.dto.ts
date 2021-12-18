import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty()
  public uuid: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public users: number;
}
