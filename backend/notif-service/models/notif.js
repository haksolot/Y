const mongoose = require("mongoose");

const NotifSchema = new mongoose.Schema({
  id_receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  id_sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  created_at: {
    type: Date,
    required: true,
  },
  type_notif: {
    type: String,
    required: true,
  },
});

const Notif = mongoose.model("Notif", NotifSchema);

module.exports = { Notif };
