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
  id_role: {
    type: Number,
    required: true,
  },
  id_session: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
});

const RoleSchema = new mongoose.Schema({
  nom_role: {
    type: String,
    required: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);
const UserInfo = mongoose.model("UserInfo", UserInfoSchema);

module.exports = { UserInfo, Role };
