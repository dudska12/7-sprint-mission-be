// src/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sprint Mission API Docs",
      version: "1.0.0",
      description: "Express + Prisma API with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000", // 개발용 서버 주소
      },
    ],
  },
  apis: ["./src/**/*.js"], // 주석으로 Swagger 달 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
