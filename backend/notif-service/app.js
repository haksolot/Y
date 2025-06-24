require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const BASE_URL = process.env.API_URL || "https://localhost:443";

const app = express();
const cors = require("cors");

const whitelist = [
  BASE_URL,
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

app.use("/", require("./routes/notif.routes"));


module.exports = app;
