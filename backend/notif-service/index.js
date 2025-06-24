const app = require("./app");
const mongoose = require("mongoose");
const connectDB = require("./utils/db");

const port = 3300;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Auth microservice running on http://localhost:${port}`);
  });
});
