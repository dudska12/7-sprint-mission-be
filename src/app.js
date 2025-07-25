import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import userRouter from "../src/routers/userRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import authRouter from "../src/routers/authRouter.js";

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
