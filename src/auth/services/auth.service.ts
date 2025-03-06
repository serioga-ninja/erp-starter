import { GoogleProfile, JwtService } from '@app/common';
import { PrismaService } from '@app/common/db/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from '../types';

@Injectable()
export default class AuthService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _jwtService: JwtService,
  ) {}

  async signInWithGoogle(googleProfile: GoogleProfile) {
    const user = await this._prisma.users.findFirst({
      where: { email: googleProfile.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return this._jwtService.generateToken(tokenPayload);
  }
}
