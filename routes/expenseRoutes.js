const express = require("express");
const expenseController = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/:eventId",
  authMiddleware.verifyToken,
  expenseController.addExpense
);
router.get(
  "/:eventId",
  authMiddleware.verifyToken,
  expenseController.getExpensesByEvent
);

module.exports = router;
