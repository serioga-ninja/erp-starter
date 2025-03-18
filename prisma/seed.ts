import { EntityStatus } from '../libs/common/src/constant';
import {
  ResourceActions,
  Resources,
} from '../libs/common/src/authorization/enums';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await Promise.all([
    //#region roles
    prisma.roles.upsert({
      where: { role: 'admin' },
      update: {},
      create: {
        role: 'admin',
        displayName: 'Admin',
      },
    }),
    prisma.roles.upsert({
      where: { role: 'hr' },
      update: {},
      create: {
        role: 'hr',
        displayName: 'HR',
      },
    }),
    prisma.roles.upsert({
      where: { role: 'pmo' },
      update: {},
      create: {
        role: 'pmo',
        displayName: 'PMO member',
      },
    }),
    prisma.roles.upsert({
      where: { role: 'employee' },
      update: {},
      create: {
        role: 'employee',
        displayName: 'Employee',
      },
    }),
    //#endregion

    //#region permissions
    prisma.resources.upsert({
      where: { name: Resources.Users },
      update: {},
      create: {
        permissions: [
          ResourceActions.Create,
          ResourceActions.Read,
          ResourceActions.Update,
          ResourceActions.Delete,
        ],
        name: Resources.Users,
        displayName: 'Users',
        description: 'Users resource',
        rolesPermissions: {
          create: [
            {
              roleId: 'admin',
              permissions: [
                ResourceActions.Create,
                ResourceActions.Read,
                ResourceActions.Update,
                ResourceActions.Delete,
              ],
            },
          ],
        },
      },
    }),
    prisma.resources.upsert({
      where: { name: Resources.Permissions },
      update: {},
      create: {
        permissions: [
          ResourceActions.Create,
          ResourceActions.Read,
          ResourceActions.Update,
          ResourceActions.Delete,
        ],
        name: Resources.Permissions,
        displayName: 'Permissions',
        description: 'Permissions resource',
        rolesPermissions: {
          create: [
            {
              roleId: 'admin',
              permissions: [
                ResourceActions.Create,
                ResourceActions.Read,
                ResourceActions.Update,
                ResourceActions.Delete,
              ],
            },
          ],
        },
      },
    }),

    //#endregion
  ]);

  if (process.env.ADMIN_EMAIL) {
    await prisma.users.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: {},
      create: {
        email: process.env.ADMIN_EMAIL,
        personalEmail: process.env.ADMIN_EMAIL,
        phone: '1234512345',
        onboardingRequired: false,
        firstName: 'Verna',
        lastName: 'Wolf',
        name: 'Mrs.',
        dob: '1990-06-22T20:00:00.000Z',
        gender: 'male',
        createdAt: new Date(),
        entityStatus: EntityStatus.Active,
        updatedAt: new Date(),
        roles: {
          create: [
            {
              roleId: 'admin',
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
