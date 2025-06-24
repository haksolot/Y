const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");
const requiredFields = require("../middlewares/requiredFields.middleware");

router.get("/", verifyToken, authController.getAllUsers);
router.post(
  "/register",
  requiredFields(["pseudo", "email", "password", "role"]),
  authController.createUser
);
router.post(
  "/login",
  requiredFields(["pseudo", "password"]),
  authController.login
);
router.post("/authenticate", authController.authenticate);
router.get("/getUserById", authController.getUserById);
router.post("/logout", authController.logout);
router.get("/getUserByProfileName", authController.getUserByProfileName);
router.get("/getAllUsers", authController.getAllUsers);
router.delete("/deleteUser", authController.deleteUser);

module.exports = router;
