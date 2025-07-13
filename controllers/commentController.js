const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createComment = async (req, res) => {
  const { content, articleId, productId, userId } = req.body;
  if (!content || (!articleId && !productId) || !userId) {
    return res.status(400).json({ error: "필수 항목을 입력해주세요." });
  }

  try {
    let comment;

    if (articleId) {
      comment = await prisma.comment.create({
        data: {
          content,
          articleId,
          userId: String(userId),
        },
      });
    } else if (productId) {
      comment = await prisma.comment.create({
        data: {
          content,
          productId,
          userId: String(userId),
        },
      });
    }
    return res.status(201).json(comment);
  } catch (error) {
    console.error("댓글 생성 중 에러:", error);
    return res.status(500).json({ error: "서버오류발생" });
  }
};

exports.patchComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "수정할 댓글의 내용을 확인하세요" });
  }
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({
      where: { id },
    });
    return res.status(200).json({ message: "상품이 삭제되었습니다. " });
  } catch (error) {
    return res.status(500).json({ error: "서버 딜리트터지는거 오류 발생" });
  }
};

exports.getArticleComments = async (req, res) => {
  const { articleId, cursor, limit = 10 } = req.params;

  if (!articleId) {
    return res.status(400).json({ error: "articleId가 필요합니다." });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { articleId },
      take: Number(limit),
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.getProductComments = async (req, res) => {
  const { productId, cursor, limit = 10 } = req.params;

  if (!productId) {
    return res.status(400).json({ error: "productId가 필요합니다." });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { productId },
      take: Number(limit),
      ...(cursor && {
        skip: 1,
        cursor: { id: cursor },
      }),
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.getAllProductComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { productId: { not: null } }, // productId가 존재하는 댓글만
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        createdAt: true,
        productId: true,
      },
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};
