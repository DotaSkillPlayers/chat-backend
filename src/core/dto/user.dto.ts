import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  constructor(id: number, login: string) {
    this.id = id;
    this.login = login;
  }

  @ApiProperty({ type: Number })
  public id: number;

  @ApiProperty({ type: String })
  public login: string;
}
