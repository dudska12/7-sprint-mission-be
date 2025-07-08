const express = require("express");
const {
  createArticle,
  getArticle,
  deleteArticle,
  getArticleList,
  patchArticle,
} = require("../controllers/articleController");
const router = express.Router();

router.post("/", createArticle);
router.get("/:id", getArticle);
router.get("/", getArticleList);
router.patch("/:id", patchArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
