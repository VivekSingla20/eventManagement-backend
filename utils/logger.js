const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "..", "logs", "app.log");

const logToFile = (message) => {
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
};

module.exports = {
  log: (message) => {
    console.log(`[LOG]: ${message}`);
    logToFile(message);
  },
  error: (message) => {
    console.error(`[ERROR]: ${message}`);
    logToFile(`ERROR: ${message}`);
  },
};
