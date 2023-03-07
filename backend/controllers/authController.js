import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genToken = (user) => {
  return jwt.sign(user, "mySecretKey");
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const register = async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password)
      return res.status(400).json({ message: "Please enter all fields" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, password: hashedPassword });
    res.status(201).json({
      username: user.name,
      id: user._id,
      token: genToken({ userId: user._id }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) return res.status(404).json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");

    const token = genToken({ userId: user._id });

    res.status(200).json({
      ...user._doc,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
