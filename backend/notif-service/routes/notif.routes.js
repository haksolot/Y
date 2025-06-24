const verifyToken = require("../middlewares/verifyToken.middleware");
const express = require("express");
const router = express.Router();
const notifController = require("../controllers/notif.controller");

router.post("/createNotif", verifyToken, notifController.createNotif);
router.get(
  "/getNotifByIdReceiver/:id_profile",
  notifController.getNotifByIdReceiver
);

module.exports = router;
