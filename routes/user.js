const express = require("express");
const router = express.Router();
const { getUser, getUserList } = require("../controllers/userController");

router.get("/", getUser);
router.get("/:id", getUserList);

module.exports = router;
