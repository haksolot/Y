require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //permet cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/post", require("./routes/post.routes"));
app.use("/api/comment", require("./routes/comment.routes"));

module.exports = app;
