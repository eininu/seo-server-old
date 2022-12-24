const express = require("express");
const router = express.Router();

// verify connection between webservers
// if websites connected - check connection between
const verifyConnection = () => {
  return true;
};

// compare websites between remote servers
// to get websites that should be added to current servers
router.post("/compare_websites", (req, res) => {
  verifyConnection();

  res.send({ message: "compare_websites" });
});

// download missing websites on the local server
// transfer missing websites to remote servers
router.post("/all", (req, res) => {
  verifyConnection();
  // check missing websites on local
  res.send({ message: "compare_websites" });
});

// add website to all remote servers
router.post("/add", (req, res) => {
  res.send({ message: "add website" });
});

// delete website from all remote servers
router.delete("/delete", (req, res) => {
  res.send({ message: "delete_website" });
});

module.exports = router;
