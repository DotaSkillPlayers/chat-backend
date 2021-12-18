import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { databaseConfigFactory } from '../database/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: databaseConfigFactory }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    UserModule,
    AuthModule,
  ],
  exports: [UserModule, AuthModule],
})
export class DomainModule {}
