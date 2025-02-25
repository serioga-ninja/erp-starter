import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { IsEmailUnique } from './pipes';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, IsEmailUnique],
  exports: [UsersService],
})
export class UsersModule {}
