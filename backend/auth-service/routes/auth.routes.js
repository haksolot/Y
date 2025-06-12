const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/', authController.getAllUsers);
router.post('/register', authController.createUser);
router.post('/login', authController.login);
router.post('/authenticate', authController.authenticate);

module.exports = router;