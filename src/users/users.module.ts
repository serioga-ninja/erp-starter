import { DatabaseModule, EmailModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import SendRegistrationEmailHandler from './commands/send-registration-email.handler';
import { IsEmailUnique } from './pipes';
import { UsersSaga, UsersService } from './services';
import { UsersController } from './users.controller';

@Module({
  imports: [CqrsModule.forRoot(), EmailModule, DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    IsEmailUnique,
    UsersSaga,
    SendRegistrationEmailHandler,
  ],
  exports: [UsersService],
})
export class UsersModule {}
