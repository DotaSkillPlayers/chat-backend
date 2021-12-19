import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { eBindings, IAuthService, IUserService, SignedUpDto } from '../../core';
import { CreateUserDto, SignInDto, SignUpDto } from '../../core/dto';
import { IHashingService } from '../../core';
import { AuthorizedUserDto } from '../../core/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
  @Inject(eBindings.UserService)
  private userService: IUserService;

  @Inject(eBindings.HashingService)
  private hashService: IHashingService;

  @Inject(JwtService)
  private jwtService: JwtService;

  public async signIn(dto: SignInDto): Promise<AuthorizedUserDto> {
    const user = await this.userService.findByCredentials(dto);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = this.jwtService.sign({ ...user });
    return new AuthorizedUserDto(user.id, user.login, token);
  }

  public async signUp(dto: SignUpDto): Promise<SignedUpDto> {
    const user = await this.userService.findByLogin(dto.login);
    if (user) {
      throw new BadRequestException('Username is already taken');
    }

    const pwd = await this.hashService.hash(dto.password);

    await this.userService.create(new CreateUserDto(dto.login, pwd));

    return new SignedUpDto();
  }
}
