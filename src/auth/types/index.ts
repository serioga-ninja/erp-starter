import type { Users } from '@prisma/client';

export type RequestUser = Users;
export type TokenPayload = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};
