import { ApiHeader } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../domains/auth/jwt-auth.guard';

export const UseAuth =
  (): MethodDecorator => (target, propertyKey, descriptor) => {
    ApiHeader({ name: 'auth-token', required: true })(
      target,
      propertyKey,
      descriptor,
    );
    UseGuards(JwtAuthGuard)(target, propertyKey, descriptor);
  };
