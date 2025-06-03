const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

const testRoutes = require('./test.routes');
const userRoutes = require('./user.routes');
router.use('/test', testRoutes);
router.use('/user', userRoutes);

module.exports = router;
