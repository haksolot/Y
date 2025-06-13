const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
});

const UserInfo = mongoose.model("UserInfo", UserInfoSchema);

module.exports = { UserInfo };
