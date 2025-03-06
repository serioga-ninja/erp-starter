import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import GoogleOauthService from './google-oauth.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [GoogleOauthService],
  exports: [GoogleOauthService],
})
export default class OAuthModule {}
