const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, authController.getAllUsers);
router.post("/register", authController.createUser);
router.post("/login", authController.login);
router.post("/authenticate", authController.authenticate);
router.post("/role/register", authController.createRole);
router.post("/role", verifyToken, authController.getAllRoles);

module.exports = router;
