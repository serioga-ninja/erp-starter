import { ProjectConfig } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService<ProjectConfig, true>);

  await app.listen(config.get('PORT'));
}
bootstrap();
