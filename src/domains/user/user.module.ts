import { Module } from '@nestjs/common';
import { EBindings } from '../../core';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { HashingModule } from '../hashing';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HashingModule],
  providers: [
    {
      provide: EBindings.UserService,
      useClass: UserService,
    },
  ],
  exports: [EBindings.UserService],
})
export class UserModule {}
