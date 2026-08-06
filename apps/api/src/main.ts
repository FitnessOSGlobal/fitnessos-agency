import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';

import { LoggerService } from './common/logger';
import { HttpExceptionFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  const logger = app.get(LoggerService);

app.useGlobalFilters(new HttpExceptionFilter(logger));

  await app.listen(3000);

  console.log(`🚀 FitnessOS API running at http://localhost:3000`);
  console.log(`📘 Swagger available at http://localhost:3000/api`);
}

bootstrap();