const jwt = require("jsonwebtoken");
const { dbAll } = require("../database/database");
const { getServers } = require("../modules/getServers");
// const { getRequesterIp } = require("../modules/getRequesterIp");
const requestIp = require("request-ip");

let requesterIp;

isAuth = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  // check if it's local request
  if (req.headers.islocalrequest === "yes") {
    const servers = await getServers();
    if (servers.length > 0) {
      const serversArray = Object.values(servers).map((el) => el.server_ip);
      if (process.env.NODE_ENV === "development") {
        console.log(clientIp);
        requesterIp = "localhost";
      } else {
        // requesterIp = requesterIp ?? (await getRequesterIp());
        requesterIp = requesterIp ?? clientIp;
      }

      // console.log(requesterIp);
      if (serversArray.includes(requesterIp)) {
        next();
      } else {
        return res
          .status(403)
          .send({ message: `Wrong ip request with ${requesterIp}!` });
      }
    } else {
      return res.send({ message: "No servers" });
    }
  } else {
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
  }
};

const authStatus = isAuth;

module.exports = authStatus;
