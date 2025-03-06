import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CommonModule from '@app/common/helpers/common.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { projectConfigSchema } from './schemas';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: projectConfigSchema,
    }),
    CommonModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
