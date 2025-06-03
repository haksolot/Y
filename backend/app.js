const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', routes); // For realease build
app.use('/api', routes); // For dev env

module.exports = app;
