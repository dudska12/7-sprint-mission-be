import userService from "../services/userService.js";

const signup = async (req, res, next) => {
  res.status(200).json({ message: "Signup route hit!" });
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserInfo(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default { signup, getUser };
