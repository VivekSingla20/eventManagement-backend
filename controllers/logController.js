const db = require("../models");

exports.getLogs = async (req, res) => {
  try {
    const logs = await db.Log.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json({ logs });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch logs", details: error.message });
  }
};
