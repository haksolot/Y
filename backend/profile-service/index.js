require("dotenv").config();
const app = require("./app");
const connectDB = require("./utils/db");

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Profile microservice running on http://localhost:${port}`);
  });
});
