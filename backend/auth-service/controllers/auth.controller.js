const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserInfo, Role } = require("../models/user");

const createUser = async (req, res) => {
  console.log("req.body", req.body);

  const { pseudo, email, id_role, id_session } = req.body,
    password = bcrypt.hashSync(req.body.password, 10);
  if (!pseudo || !email || !req.body.password) {
    return res.status(400).json({
      msg: "Missing parameters",
    });
  }
  try {
    const newUser = new UserInfo({
      pseudo,
      email,
      password,
      id_role,
      id_session,
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
    console.log("JWT KEY:", process.env.ACCESS_JWT_KEY);

    const accessToken = jwt.sign(
      {
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + 120,
      },
      process.env.ACCESS_JWT_KEY
    );
    console.log(user._id);

    return res
      .status(200)
      .json({ message: "You are now connected!", accessToken });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
const authenticate = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_JWT_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decodedToken._id;
    if (!userId) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "You are authenticated!" });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createRole = async (req, res) => {
  const { nom_role } = req.body;
  if (!nom_role) {
    return res.status(400).json({
      msg: "Missing parameter",
    });
  }
  try {
    const newRole = new Role({ nom_role });
    await newRole.save();
    return res.status(201).json({
      msg: "New Role created !",
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  login,
  authenticate,
  createRole,
  getAllRoles,
};
