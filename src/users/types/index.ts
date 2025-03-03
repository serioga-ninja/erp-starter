import { Users } from '@prisma/client';

export type CreateUserData = Pick<
  Users,
  'email' | 'firstName' | 'lastName' | 'password' | 'role'
>;
export type CreateUserReturn = Pick<
  Users,
  'id' | 'email' | 'firstName' | 'lastName' | 'role' | 'createdAt' | 'updatedAt'
>;
