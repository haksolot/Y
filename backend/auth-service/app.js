//Importation de express
const express = require('express');
const mongoose = require("mongoose");
//création d'une instance
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;