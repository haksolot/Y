const app = require("./app");
const mongoose = require("mongoose");
const connectDB = require("./utils/db");

const port = 3200;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Profile microservice running on http://localhost:${port}`);
  });
});
