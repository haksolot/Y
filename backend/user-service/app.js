const express = require('express');
const testRoutes = require('./routes/test.routes');

const app = express();

app.use(express.json());

app.use('/', testRoutes);

app.get('/test', (req, res) => {
  res.send('User service is up 🦐');
});

module.exports = app;
