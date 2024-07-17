const fs = require("fs");

function logReqRes(fileName) {
  return function (req, res, next) {
    fs.appendFile(
      fileName,
      `${req.method} ${req.url} - ${new Date()}\n`,
      (err) => {
        if (err) console.error(err);
        next();
      }
    );
  };
}

module.exports = { logReqRes };
