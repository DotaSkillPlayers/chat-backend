import { NestFactory } from '@nestjs/core';
import { ApiModule } from './app';
import { bootstrapSwagger } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('/api');
  bootstrapSwagger(app);
  await app.listen(3000);
}
bootstrap();
