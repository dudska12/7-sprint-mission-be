import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      image: true,
    },
  });
  return user;
};

export default { findUser };
