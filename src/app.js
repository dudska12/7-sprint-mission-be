import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
