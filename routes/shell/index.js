const express = require("express");
const router = express.Router();
const nginx = require("./nginx");

router.get("/", (req, res) => {
  res.send({ message: "shell path" });
});

router.use("/nginx/", nginx);

module.exports = router;
