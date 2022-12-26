var express = require("express");
const { dbRun, dbAll } = require("../database/database");
const router = express.Router();

router.get("/", async (req, res) => {
  const servers = await dbAll(
    `SELECT t.*
     FROM servers t
     LIMIT 501;`
  );
  const serversArr = servers.map((el) => el.server_ip);
  res.send(serversArr);
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
