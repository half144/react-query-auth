import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const genToken = (user) => {
  jwt.sign(user, "mySecretKey");
};

export const me = async (req, res) => {
  try {
    const user = req.user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const register = async (req, res) => {
  const { name, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, password: hashedPass });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json("Wrong password");
    res.status(200).json({
        ...user._doc,
        token: genToken(user._id)
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
