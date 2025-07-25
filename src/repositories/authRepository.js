import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async ({ email, password, nickname }) => {
  const user = await prisma.user.create({
    data: { email, password, nickname },
  });
  return user;
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
