import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.role.upsert({
    where: { id: '06d24c95-8487-4d3e-8bc4-f8569b138e4d' },
    update: {
      name: 'admin',
    },
    create: {
      id: '06d24c95-8487-4d3e-8bc4-f8569b138e4d',
      name: 'admin',
    },
  });

  const user = await prisma.role.upsert({
    where: { id: 'de9a30e7-0200-4056-b5af-7e7377969290' },
    update: {
      name: 'user',
    },
    create: {
      id: 'de9a30e7-0200-4056-b5af-7e7377969290',
      name: 'user',
    },
  });

  const dataUser = {
    id: '879ae6d5-0414-4b84-8f13-9dc32921a2ee',
    name: 'test',
    password: await bcrypt.hash('password', 10),
    roleId: 'de9a30e7-0200-4056-b5af-7e7377969290',
    email: 'test@example.com',
    profile_picture: faker.image.avatar(),
  };

  await prisma.user.upsert({
    where: { id: '879ae6d5-0414-4b84-8f13-9dc32921a2ee' },
    update: dataUser,
    create: dataUser,
  });

  console.log({ admin, user });
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
