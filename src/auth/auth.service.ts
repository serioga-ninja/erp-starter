import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  async signIn(email: string): Promise<any> {
    const user = await this._usersService.getOneUserBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}
