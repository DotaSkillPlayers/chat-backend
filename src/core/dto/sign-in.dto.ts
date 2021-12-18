import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ type: String, example: 'mycoollogin' })
  @IsString()
  @MinLength(4)
  public login: string;

  @ApiProperty({ type: String, example: 'mycoolpassword' })
  @IsString()
  @MinLength(6)
  public password: string;
}
