const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Websites path" });
});

module.exports = router;
