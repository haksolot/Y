require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

const whitelist = [
  "http://localhost:5173",
  "http://localhost",
  "http://localhost:3000",
  "https://localhost",
  "https://localhost:443",
  "https://y.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Neine :" + origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/auth.routes"));

module.exports = app;
