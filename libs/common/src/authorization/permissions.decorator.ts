import { SetMetadata } from '@nestjs/common';
import { ResourceActions, Resources } from './enums';

export type DecoratedPermission = {
  resource: Resources;
  actions: ResourceActions[];
};
export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (permissions: DecoratedPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
