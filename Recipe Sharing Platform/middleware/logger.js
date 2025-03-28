const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/requests.log");

// Ensure the logs directory exists
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a write stream for efficient logging
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

const logRequest = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${req.ip}\n`;

  logStream.write(log, (err) => {
    if (err) console.error("Logging Error:", err);
  });

  next();
};

module.exports = logRequest;
