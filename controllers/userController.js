const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
  const { cursor, limit = 10 } = req.query; // query로 받는 게 일반적입니다

  try {
    const users = await prisma.user.findMany({
      take: Number(limit),
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { id: "desc" }, // id는 항상 존재하므로 안전
      select: {
        id: true,
        name: true,
        email: true,
        // createdAt 제거
        Comment: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.getUserList = async (req, res) => {
  const { id } = req.params; // URL 파라미터에서 id 받음

  if (!id) {
    return res.status(400).json({ error: "유저 ID가 필요합니다." });
  }

  try {
    const user = await prisma.User.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        // 필요하면 추가 필드 넣으세요
        Comment: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "해당 유저를 찾을 수 없습니다." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("getUserList error:", error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};
