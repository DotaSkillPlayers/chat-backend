import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../core/dto';
import { eBindings, IUserService } from '../../core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  @Inject(eBindings.UserService)
  private userService: IUserService;

  async validate(payload: UserDto): Promise<UserDto> {
    return { id: payload.id, login: payload.login };
  }
}
