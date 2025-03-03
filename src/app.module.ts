import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import HelpersModule from '../libs/common/src/helpers/helpers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { projectConfigSchema } from './schemas';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HelpersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: projectConfigSchema,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
