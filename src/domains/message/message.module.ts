import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './mesage.repository';
import { eBindings } from '../../core';
import { MessageService } from './message.service';
import { RoomModule } from '../room';

@Module({
  imports: [TypeOrmModule.forFeature([MessageRepository]), RoomModule],
  providers: [
    {
      provide: eBindings.MessageService,
      useClass: MessageService,
    },
  ],
  exports: [eBindings.MessageService],
})
export class MessageModule {}
