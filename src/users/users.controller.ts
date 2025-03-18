import { Permissions, ResourceActions, Resources } from '@app/common';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import AuthorizationGuard from '../../libs/common/src/authorization/authorization.guard';
import AuthenticationGuard from '../auth/guards/authentication.guard';
import CreateUserDto from './dtos/create-user.dto';
import GetOneUserDto from './dtos/get-one-user.dto';
import { UsersService } from './services';

@UseGuards(AuthenticationGuard, AuthorizationGuard)
@Permissions([{ resource: Resources.Users, actions: [ResourceActions.Read] }])
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  handleCreateUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Permissions([{ resource: Resources.Users, actions: [ResourceActions.Read] }])
  @Get('/:userId')
  handleGetUserById(@Param() params: GetOneUserDto) {
    return this.usersService.getOneUserBy({ id: params.userId });
  }
}
