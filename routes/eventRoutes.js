const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware.verifyToken, eventController.createEvent);
router.get(
  "/:eventId",
  authMiddleware.verifyToken,
  eventController.getEventDetails
);

module.exports = router;
