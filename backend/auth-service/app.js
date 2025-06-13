require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth.routes'));

module.exports = app;