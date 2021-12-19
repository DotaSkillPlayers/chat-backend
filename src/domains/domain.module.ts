import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { databaseConfigFactory } from '../database/config';
import { RoomModule } from './room';
import { MessageModule } from './message/message.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: databaseConfigFactory }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AuthModule,
    RoomModule,
    MessageModule,
  ],
  exports: [UserModule, AuthModule, RoomModule, MessageModule],
})
export class DomainModule {}
