const express = require("express");
const { dbRun } = require("../database/database");
const { tgTestConfigure } = require("../modules/telegram");
const fs = require("fs");
const router = express.Router();

const setAuthCode = () => `${Math.floor(100000 + Math.random() * 900000)}`;

let generatedAuthCode = setAuthCode();
let timeout = false;

setInterval(() => {
  generatedAuthCode = setAuthCode();
}, 60000);

checkTimeout = (req, res, next) => {
  if (timeout === false) {
    next();
  } else {
    res.send({ message: "timeout: " + timeout });
  }
};

router.post("/", async (req, res) => {
  let result;

  const randomJwt = `${new Array(36).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(x)).join('')}`;

  const password = req.body.password;
  const tgToken = req.body.tgToken;
  const tgUserId = req.body.tgUserId;

  const isFieldsFilled = () => {
    for (const [value] of Object.entries(req.body)) {
      if (value.length === 0) {
        return false;
      }
    }
    return true;
  };

  const tgAuthCode = req.body.tgAuthCode;

  if (isFieldsFilled && tgAuthCode === generatedAuthCode) {
    dbRun(`DROP TABLE IF EXISTS config`);
    dbRun(`CREATE TABLE IF NOT EXISTS config(key PRIMARY KEY,value)`);
    dbRun(`INSERT INTO config(key,value) VALUES (?,?)`, [
      "jwtSecret",
      randomJwt,
    ]);
    dbRun(`INSERT INTO config(key,value) VALUES (?,?)`, ["password", password]);
    dbRun(`INSERT INTO config(key,value) VALUES (?,?)`, ["tg_token", tgToken]);
    dbRun(`INSERT INTO config(key,value) VALUES (?,?)`, [
      "tg_user_id",
      tgUserId,
    ]);

    dbRun(`DROP TABLE IF EXISTS settings`);
    dbRun(`CREATE TABLE IF NOT EXISTS settings(key PRIMARY KEY,value)`);
    dbRun(`DROP TABLE IF EXISTS websites`);
    dbRun(`CREATE TABLE IF NOT EXISTS websites(website PRIMARY KEY)`);
    dbRun(`DROP TABLE IF EXISTS servers`);
    dbRun(`CREATE TABLE IF NOT EXISTS servers(server_ip PRIMARY KEY)`);

    result = "Successfully configured!";
  } else {
    result = await tgTestConfigure(
      tgToken,
      tgUserId,
      `\`${generatedAuthCode}\` — your jp9 auth code`
    );
  }

  if (!fs.existsSync(process.cwd() + "/websites/uploads/")) {
    fs.mkdirSync(process.cwd() + "/websites/");
    fs.mkdirSync(process.cwd() + "/websites/uploads/");
  }

  if (!fs.existsSync(process.cwd() + "/nginx-configs/")) {
    fs.mkdirSync(process.cwd() + "/nginx-configs/");
  }

  res.send({ message: `${result}` });
});

module.exports = router;
