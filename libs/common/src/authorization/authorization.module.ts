import { DatabaseModule } from '../db';
import { Global, Module } from '@nestjs/common';
import AuthorizationService from './authorization.service';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export default class AuthorizationModule {}
