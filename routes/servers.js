var express = require("express");
const { dbAll, dbRun } = require("../database/database");
const router = express.Router();

const checkIfTableExists = async () => {
  let tableExistings = await dbAll(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='servers';`
  );

  return tableExistings.length;
};

router.use(async (req, res, next) => {
  let tableExistings = await checkIfTableExists();

  if (tableExistings === 0) {
    // dbRun(`DROP TABLE IF EXISTS`);
    await dbRun(`CREATE TABLE IF NOT EXISTS servers(server_ip PRIMARY KEY)`);
  }
  next();
});

router.post("/", (req, res) => {
  const serverIp = req.body.server_ip;
  dbRun(`INSERT INTO servers(server_ip) VALUES (?)`, [serverIp]);
  res.send({ message: "Successful added" });
});

router.delete("/", (req, res) => {
  const serverIp = req.body.server_ip;
  dbRun(`DELETE from servers WHERE server_ip=?`, serverIp);
  res.send({ message: "Successful deleted" });
});

module.exports = router;
