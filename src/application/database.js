import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.$connect();
  console.log('Database connected');
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
