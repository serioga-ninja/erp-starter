import { JwtService } from '@app/common';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TOKEN_KEY } from '../constant';
import { TokenPayload } from '../types';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  public canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    let token = req.session.get(TOKEN_KEY);

    if (!token) {
      token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) throw new UnauthorizedException();
    }

    const user = this.jwtService.parseToken<TokenPayload>(token);

    if (!user) throw new UnauthorizedException();

    req.user = user;

    return true;
  }
}
