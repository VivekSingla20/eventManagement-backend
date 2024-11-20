const express = require("express");
const logController = require("../controllers/logController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware.verifyToken, logController.getLogs);

module.exports = router;
