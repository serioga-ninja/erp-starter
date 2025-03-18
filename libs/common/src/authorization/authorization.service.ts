import { DecoratedPermission, PrismaService } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { JsonArray } from '@prisma/client/runtime/client';
import { ResourceActions, Resources } from './enums';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export default class AuthorizationService {
  private readonly _logger = new Logger(AuthorizationService.name);

  constructor(private readonly _prisma: PrismaService) {}

  async canAccess(
    userId: string,
    userRoles: string[],
    permission: DecoratedPermission,
  ): Promise<boolean> {
    const resource = await this._prisma.resources.findFirst({
      where: {
        name: permission.resource,
        usersPermissions: {
          every: {
            userId,
          },
        },
        rolesPermissions: {
          some: {
            roleId: {
              in: userRoles,
            },
          },
        },
      },
      include: {
        usersPermissions: true,
        rolesPermissions: true,
      },
    });

    if (!resource) {
      this._logger.error(`Resource not found: ${permission.resource}`);

      return false;
    }

    const resourcePermissions = this._extractPermissions(resource);
    const userPermissions = this._extractPermissions(
      resource.usersPermissions.at(0),
    );
    const rolesPermissions = resource.rolesPermissions
      .map((role) => this._extractPermissions(role))
      .flat()
      .filter(Boolean) as ResourceActions[];

    if (!this._includesAll(resourcePermissions, permission.actions)) {
      this._logger.error(
        `Resource ${permission.resource} does not include all required permissions`,
      );

      return false;
    }

    const userHasPermissions = this._includesAll(
      userPermissions,
      permission.actions,
    );
    const roleHasPermissions = this._includesAll(
      rolesPermissions,
      permission.actions,
    );

    if (!userHasPermissions && !roleHasPermissions) {
      this._logger.error(
        `User ${userId} does not have required permissions for resource ${permission.resource}`,
      );

      return false;
    }

    return true;
  }

  private _includesAll(
    permissions: ResourceActions[] | null,
    actions: ResourceActions[],
  ) {
    if (!permissions) return false;

    return actions.every((action) => permissions.includes(action));
  }

  private _extractPermissions<T extends { permissions: JsonValue }>(
    obj?: T,
  ): ResourceActions[] | null {
    return (obj?.permissions as JsonArray as ResourceActions[]) || null;
  }
}
