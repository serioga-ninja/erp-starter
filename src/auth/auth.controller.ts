import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateUserDto } from './dtos';
import SignInDto from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this._authService.signIn(signInDto.email);
  }

  @Post('activate/:activationCode')
  handleActivateUser(@Param('activationCode') body: ActivateUserDto) {
    return this._authService.activateUser(body);
  }
}
