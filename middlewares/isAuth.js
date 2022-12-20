const jwt = require("jsonwebtoken");
const { dbAll } = require("../database/database");

isAuth = async (req, res, next) => {
  // const authToken = req.headers["x-access-token"];

  const jwtSecretQuery = await dbAll(
    `SELECT value FROM config  WHERE  key is 'jwtSecret'`
  );

  const jwtSecret = jwtSecretQuery[0].value;

  const authToken = req.cookies["jwt"];

  if (!authToken) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(authToken, jwtSecret, (err) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
};

const authStatus = isAuth;

module.exports = authStatus;
