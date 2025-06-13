const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/", authController.getAllUsers);
router.post("/register", authController.createUser);
router.post("/login", authController.login);
router.post("/authenticate", authController.authenticate);
router.post("/role/register", authController.createRole);
router.post("/role", authController.getAllRoles);

module.exports = router;
