import { AllExceptionsFilter, Logger, ProjectConfig } from '@app/common';
// import fastifyCors from '@fastify/cors';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';
import secureSession from '@fastify/secure-session';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useLogger(new Logger());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = app.get(ConfigService<ProjectConfig, true>);

  await app.register(secureSession, {
    secret: config.get<string>('SESSION_SECRET'),
    salt: config.get<string>('SESSION_SALT'),
    expiry: Number.MAX_SAFE_INTEGER,
  });
  await app.register(fastifyHelmet);
  await app.register(fastifyCsrfProtection, { cookieOpts: { signed: true } });
  // app.register(fastifyCors, {
  //   credentials: true,
  //   origin: `https://${config.get<string>('domain')}`,
  // });

  await app.listen(config.get('PORT'));
}

bootstrap();
