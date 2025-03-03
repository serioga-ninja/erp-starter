import { PrismaService } from '@app/common/db/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/services';
import { ActivateUserDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _prisma: PrismaService,
  ) {}

  async signIn(email: string): Promise<any> {
    const user = await this._usersService.getOneUserBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }

  async activateUser(data: ActivateUserDto) {}
}
