import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  constructor(uuid: string, name: string, users: number) {
    this.uuid = uuid;
    this.name = name;
    this.users = users;
  }

  @ApiProperty()
  public uuid: string;

  @ApiProperty()
  public name: string;

  @ApiProperty({ description: 'not always exists' })
  public users: number;
}
