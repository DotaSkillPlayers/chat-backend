import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedUserDto extends UserDto {
  constructor(id: number, login: string, token: string) {
    super(id, login);
    this.token = token;
  }

  @ApiProperty({ type: String })
  private readonly token: string;
}
