import { Module } from '@nestjs/common';
import { eBindings } from '../../core';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { HashingModule } from '../hashing';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HashingModule],
  providers: [
    {
      provide: eBindings.UserService,
      useClass: UserService,
    },
  ],
  exports: [eBindings.UserService],
})
export class UserModule {}
