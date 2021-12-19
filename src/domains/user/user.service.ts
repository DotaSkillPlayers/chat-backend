import { Inject, Injectable } from '@nestjs/common';
import { eBindings, IHashingService, IUserService } from '../../core';
import { CreateUserDto, SignInDto, UserDto } from '../../core/dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities';

@Injectable()
export class UserService implements IUserService {
  @InjectRepository(UserRepository)
  private repo: UserRepository;

  @Inject(eBindings.HashingService)
  private hashingService: IHashingService;

  public async create(dto: CreateUserDto): Promise<UserDto> {
    return this.repo
      .save(Object.assign(new UserEntity(), dto))
      .then((r) => new UserDto(r.id, r.login));
  }

  public findByCredentials(dto: SignInDto): Promise<UserDto> {
    return this.repo.findOne({ login: dto.login }).then(async (r) => {
      if (!r) {
        return null;
      }
      if (!(await this.hashingService.compare(dto.password, r.password))) {
        return null;
      }
      return new UserDto(r.id, r.login);
    });
  }

  public findByLogin(login: string): Promise<UserDto> {
    return this.repo
      .findOne({ login })
      .then((r) => (r ? new UserDto(r.id, r.login) : null));
  }
}
