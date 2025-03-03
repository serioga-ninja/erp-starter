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
