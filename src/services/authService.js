import { createUser, findUserByEmail } from "../repositories/authRepository.js";
import { hashPassword, comparePassword } from "../util/hash.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const signUp = async ({
  email,
  password,
  passwordConfirmation,
  nickname,
}) => {
  if (password !== passwordConfirmation) {
    throw new Error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await hashPassword(password);
  console.log("🔐 해시된 비밀번호:", hashedPassword);

  const user = await createUser({
    email,
    password: hashedPassword,
    nickname,
  });

  return user;
};

export const signIn = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("존재하지 않는 이메일입니다.");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("비밀번호가 일치하지 않습니다.");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1w",
  });

  return token;
};
