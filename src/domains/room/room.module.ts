import { Module } from '@nestjs/common';
import { eBindings } from '../../core';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  providers: [
    {
      provide: eBindings.RoomService,
      useClass: RoomService,
    },
  ],
  exports: [eBindings.RoomService],
})
export class RoomModule {}
