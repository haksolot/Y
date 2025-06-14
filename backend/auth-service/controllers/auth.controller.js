const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserInfo } = require("../models/user");

const createUser = async (req, res) => {
  console.log("req.body", req.body);

  const { pseudo, email, role } = req.body,
    password = bcrypt.hashSync(req.body.password, 10);
  if (!pseudo || !email || !req.body.password) {
    return res.status(400).json({
      msg: "Missing parameters",
    });
  }
  try {
    const existingUser = await UserInfo.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }
    const existingPseudo = await UserInfo.findOne({ pseudo });
    if (existingPseudo) {
      return res.status(400).json({
        msg: "Pseudo already exists",
      });
    }

    const newUser = new UserInfo({
      pseudo,
      email,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      msg: "New User created !",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserInfo.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};
const login = async (req, res) => {
  const { pseudo, password } = req.body;
  try {
    const user = await UserInfo.findOne({ pseudo });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidePassword = await bcrypt.compare(password, user.password);
    if (!isValidePassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.ACCESS_JWT_KEY,
      { expiresIn: "2min" }
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "You are now connected!" });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
const authenticate = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_JWT_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decodedToken._id;
    console.log("id", userId);
    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "You are authenticated!", userId });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  login,
  authenticate,
};
