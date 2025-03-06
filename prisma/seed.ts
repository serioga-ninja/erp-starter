import { EntityStatus } from '../libs/common/src/constant';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.roles.upsert({
    where: { role: 'superadmin', displayName: 'Super Admin' },
    update: {},
    create: {
      role: 'superadmin',
      displayName: 'Super Admin',
    },
  });

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
        role: 'superadmin',
        createdAt: new Date(),
        entityStatus: EntityStatus.Active,
        updatedAt: new Date(),
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
