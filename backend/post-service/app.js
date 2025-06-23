require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

const whitelist = [
  "http://localhost:5173",
  "http://localhost",
  "https://localhost",
  "https://y.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/post", require("./routes/post.routes"));
app.use("/comment", require("./routes/comment.routes"));

module.exports = app;
