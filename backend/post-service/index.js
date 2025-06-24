const app = require("./app");
const mongoose = require("mongoose");
const connectDB = require("./utils/db");

const port = process.env.PORT || 3002;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Post microservice running on http://localhost:${port}`);
  });
});
