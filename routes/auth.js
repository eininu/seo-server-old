const express = require("express");
const router = express.Router();
const { tgSendMessage } = require("../modules/telegram");
const jwt = require("jsonwebtoken");
const { dbAll } = require("../database/database");
const setAuthCode = () => `${Math.floor(100000 + Math.random() * 900000)}`;

let authCode = setAuthCode();
let timeout = false;

setInterval(() => {
  authCode = setAuthCode();
}, 60000);

checkTimeout = (req, res, next) => {
  if (timeout === false) {
    next();
  } else {
    res.send({ message: "timeout: " + timeout });
  }
};

let jwtSecret;
let password;

router.post(
  "/login",
  checkTimeout,
  async (req, res, next) => {
    const jwtSecretQuery = await dbAll(
      `SELECT value FROM config  WHERE  key is 'jwtSecret'`
    );
    const passwordQuery = await dbAll(
      `SELECT value FROM config  WHERE  key is 'password'`
    );

    jwtSecret = jwtSecretQuery[0].value;
    password = passwordQuery[0].value;

    // console.log(req.body.password, req.body.auth_code);
    if (req.body.password === password) {
      next();
    } else {
      // console.log("Incorrect password");

      res.status(401).send({ message: "Incorrect password" });
    }
  },
  (req, res, next) => {
    if (!req.body.auth_code) {
      tgSendMessage(`\`${authCode}\` — your jp9 auth code`);
      return res.send({ message: "Correct password. Auth code sent." });
    }

    if (req.body.auth_code === authCode) {
      next();
    } else {
      timeout = true;
      setTimeout(() => {
        timeout = false;
      }, 10000);
      res.send({ message: "Incorrect auth code" });
    }
  },
  (req, res) => {
    const token = jwt.sign({}, jwtSecret, {
      expiresIn: 604800, // 7 days
    });
    res
      .cookie("jwt", token)
      .setHeader("x-access-token", token)
      .status(200)
      .send({ message: "Correct password and auth code. Logged in." });
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.status(200).send({ message: "Cookies were cleaned" });
});

module.exports = router;
