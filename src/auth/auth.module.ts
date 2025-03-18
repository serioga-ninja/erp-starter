import { DatabaseModule, OAuthModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthenticationGuard } from './guards';
import { AuthService } from './services';

@Module({
  imports: [UsersModule, DatabaseModule, OAuthModule, OAuthModule],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationGuard],
})
export class AuthModule {}
