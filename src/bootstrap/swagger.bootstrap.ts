import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const bootstrapSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Kek chat API')
    .setDescription('The chat API description')
    .setVersion('1.0')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
};
