import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { eBindings } from '../../core';
import { UserModule } from '../user';
import { HashingModule } from '../hashing';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    HashingModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '100d' },
        };
      },
    }),
  ],
  providers: [
    {
      provide: eBindings.AuthService,
      useClass: AuthService,
    },
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [eBindings.AuthService, JwtAuthGuard],
})
export class AuthModule {}
