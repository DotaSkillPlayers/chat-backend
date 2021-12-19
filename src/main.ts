import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter, ApiModule } from './app';
import { bootstrapSwagger } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.setGlobalPrefix('/api');
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  bootstrapSwagger(app);
  await app.listen(1488);
}
bootstrap();
