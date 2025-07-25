import userRepository from "../repositories/userRepository.js";

const signup = async () => {};

const getUserInfo = async (id) => {
  const user = await userRepository.findUser(id);

  if (!user) throw new Error("해당 유저를 찾을 수 없습니다.");

  return user;
};

export default { signup, getUserInfo };
