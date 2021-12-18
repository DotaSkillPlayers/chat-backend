import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import { DomainModule } from '../../domains/domain.module';

@Module({
  imports: [DomainModule],
  controllers: Object.values(controllers),
})
export class ApiModule {}
