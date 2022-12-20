const express = require("express");
const { dbRun, dbAll } = require("../database/database");
const router = express.Router();

const checkIfTableExists = async () => {
  let tableExistings = await dbAll(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='websites';`
  );

  return tableExistings.length;
};
router.get("/", async (req, res) => {
  // checking that table websites exists in database

  let tableExistings = await checkIfTableExists();

  if (tableExistings === 0) {
    return res.send({ message: "The websites api isn't configured" });
  }

  return res.send({ message: "ok" });
});

router.get("/create_table", async (req, res) => {
  let tableExistings = await checkIfTableExists();

  if (tableExistings === 1) {
    return res.send({ message: "App currently configured" });
  }

  // dbRun(`DROP TABLE IF EXISTS websites`);
  await dbRun(`CREATE TABLE IF NOT EXISTS websites(website PRIMARY KEY)`);

  return res.send({ message: "Database table created successfully" });
});

module.exports = router;
