const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
  },
});

const UserInfo = mongoose.model("UserInfo", UserInfoSchema);

module.exports = { UserInfo };
