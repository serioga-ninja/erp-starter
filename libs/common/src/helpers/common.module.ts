import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService, StringService, PasswordService, Logger } from './services';

@Global()
@Module({
  imports: [ConfigModule, JwtModule],
  providers: [StringService, PasswordService, Logger, JwtService],
  exports: [StringService, PasswordService, Logger, JwtService],
})
export default class CommonModule {}
