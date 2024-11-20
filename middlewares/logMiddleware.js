const db = require("../models");

exports.logRequest = async (req, res, next) => {
  const logMessage = `Method: ${req.method}, URL: ${
    req.url
  }, Time: ${new Date().toISOString()}`;
  try {
    await db.Log.create({ log_message: logMessage });
  } catch (error) {
    console.error("Error logging request:", error);
  }
  next();
};
