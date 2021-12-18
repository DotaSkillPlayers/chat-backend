import { CreateUserDto, SignInDto, UserDto } from '../dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<UserDto>;
  findByCredentials(dto: SignInDto): Promise<UserDto>;
  findByLogin(login: string): Promise<UserDto>;
}
