import { Module } from '@nestjs/common';
import { EBindings } from '../../core';
import { HashingService } from './hashing.service';

@Module({
  providers: [
    {
      provide: EBindings.HashingService,
      useClass: HashingService,
    },
  ],
  exports: [EBindings.HashingService],
})
export class HashingModule {}
