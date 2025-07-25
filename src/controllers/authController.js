import * as authService from "../services/authService.js";

export const signUp = async (req, res) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(201).json({ message: "회원가입 성공", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const token = await authService.signIn(req.body);
    res.status(200).json({ message: "로그인 성공", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
