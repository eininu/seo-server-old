var express = require("express");
const { dbAll, dbRun } = require("../database/database");
const router = express.Router();

router.get("/", async (req, res) => {
  const settings = await dbAll(`SELECT * FROM settings`);
  res.send(settings);
});

router.post("/", (req, res) => {
  const key = req.body.key;
  const value = req.body.value;

  if (key.length === 0 && value.length === 0) {
    return res.status(403).send({ message: "Blank key or value" });
  }
  dbRun(`INSERT INTO settings(key, value) VALUES (?,?)`, [key, value]);
  res.send({ message: "Successful added" });
});

router.delete("/", (req, res) => {
  const key = req.body.key;
  dbRun(`DELETE from settings WHERE key=?`, key);
  res.send({ message: "Successful deleted" });
});

module.exports = router;
