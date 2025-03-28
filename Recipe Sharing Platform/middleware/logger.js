const fs = require("fs");
const path = require("path");

const logRequest = (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  
  fs.appendFile(path.join(__dirname, "../logs/requests.log"), log, (err) => {
    if (err) console.error("Logging Error:", err);
  });

  next();
};

module.exports = logRequest;
