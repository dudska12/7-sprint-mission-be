const express = require("express");
const router = express.Router();
const {
  getProductComments,
  patchComment,
  deleteComment,
  getArticleComments,
  createComment,
  getAllProductComments,
} = require("../controllers/commentController");

router.post("/", createComment);
router.patch("/:id", patchComment);
router.delete("/:id", deleteComment);
router.get("/article/:articleId", getArticleComments);
router.get("/product/:productId", getProductComments);
router.get("/product", getAllProductComments); // 전체 product 댓글 조회

module.exports = router;
