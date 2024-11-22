const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", eventController.createEvent);
router.get("/:eventId", eventController.getEventDetails);

module.exports = router;
