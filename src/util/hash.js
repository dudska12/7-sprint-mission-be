import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

export async function comparePassword(password, hashPassword) {
  const compare = await bcrypt.compare(password, hashPassword);
  return compare;
}
