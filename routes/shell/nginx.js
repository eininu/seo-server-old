const express = require("express");
const router = express.Router();
const shell = require("shelljs");

let password;

// set sudo password for using root commands
router.get("/set_password", (req, res) => {
  password = req.query.password;
  const command = shell.exec(`echo ${password} | sudo -S whoami`);
  res.send({ message: command });
});

// sudo nginx -t
router.get("/t", (req, res) => {
  const command = shell.exec(`echo ${password} | sudo -S nginx -t`);
  res.send({ message: command });
});

// sudo nginx -s reload
router.get("/reload", (req, res) => {
  const command = shell.exec(`echo ${password} | sudo -S nginx -s reload`);

  res.send({ message: command });
});

module.exports = router;
