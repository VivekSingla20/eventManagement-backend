const db = require("../models");

exports.addExpense = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { amount, description } = req.body;

    const event = await db.Event.findByPk(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const newExpense = await db.Expense.create({
      amount,
      description,
      event_id: eventId,
    });

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add expense", details: error.message });
  }
};

exports.getExpensesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const expenses = await db.Expense.findAll({ where: { event_id: eventId } });

    res.status(200).json({ expenses });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch expenses", details: error.message });
  }
};
