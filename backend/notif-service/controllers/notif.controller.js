require("dotenv").config();

const { Notif } = require("../models/notif");

const createNotif = async (req, res) => {
  try {
    const newNotif = new Notif(req.body);
    const savedNotif = await newNotif.save();
    res.status(200).json(savedNotif);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getNotifByIdReceiver = async (req, res) => {
  try {
    const { id_profile } = req.params;
    if (!id_profile)
      return res.status(400).json({ error: "id_profile manquant" });

    const notifs = await Notif.find({ id_receiver: id_profile });
    res.status(200).json(notifs);
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


module.exports = {
  createNotif,
  getNotifByIdReceiver,
};
