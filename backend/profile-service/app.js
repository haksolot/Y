﻿require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/api/profile", require("./routes/profile.routes"));


module.exports = app;