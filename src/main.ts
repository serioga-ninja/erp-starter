import { ProjectConfig } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '@app/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = app.get(ConfigService<ProjectConfig, true>);

  await app.listen(config.get('PORT'));
}
bootstrap();
