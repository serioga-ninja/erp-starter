import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import AuthorizationService from './authorization.service';
import { DecoratedPermission, PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export default class AuthorizationGuard implements CanActivate {
  private readonly _logger = new Logger(AuthorizationGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    const routePermissions: DecoratedPermission[] =
      this.reflector.getAllAndOverride(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!routePermissions) {
      return true;
    }

    try {
      for (const routePermission of routePermissions) {
        const userPermission = await this.authService.canAccess(
          request.user.id,
          request.user.roles,
          routePermission,
        );

        if (!userPermission) throw new ForbiddenException();
      }
    } catch (e) {
      this._logger.error(e);

      throw new ForbiddenException();
    }

    return true;
  }
}
