const express = require("express");
const { dbAll } = require("../database/database");
const router = express.Router();

router.get("/", async (req, res) => {
  // checking that table websites exists in database
  let tableExistings = await dbAll(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='websites';`
  );
  tableExistings = tableExistings.length;

  if (tableExistings === 0) {
    return res.send({ message: "The websites api isn't configured" });
  }

  res.send({ message: "Websites path" });
});

module.exports = router;
