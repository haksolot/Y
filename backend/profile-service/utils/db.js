const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    // await mongoose.connect(
    //   "mongodb://" +
    //     process.env.MONGO_HOST +
    //     ":" +
    //     process.env.MONGO_PORT +
    //     "/" +
    //     process.env.MONGO_DATABASE_NAME
    // );

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // console.log(
    //   "mongodb://" +
    //     process.env.MONGO_HOST +
    //     ":" +
    //     process.env.MONGO_PORT +
    //     "/" +
    //     process.env.MONGO_DATABASE_NAME
    // );

    process.exit(1);
  }
};

module.exports = connectDB;
