import { Module } from '@nestjs/common';
import { eBindings } from '../../core';
import { HashingService } from './hashing.service';

@Module({
  providers: [
    {
      provide: eBindings.HashingService,
      useClass: HashingService,
    },
  ],
  exports: [eBindings.HashingService],
})
export class HashingModule {}
