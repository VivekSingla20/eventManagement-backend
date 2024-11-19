const express = require("express");
const { createEvent, joinEvent, fetchEvents } = require("../controllers/eventController");

const router = express.Router();

router.post("/create", createEvent);
router.post("/join", joinEvent);
router.get("/", fetchEvents);

module.exports = router;
