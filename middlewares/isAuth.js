const jwt = require("jsonwebtoken");
const { dbAll } = require("../database/database");

const getRequesterIp = async () => {
  let res = await fetch("https://myipv4.p1.opendns.com/get_my_ip");
  const resJson = await res.json();
  return `${resJson.ip}`;
};

let requesterIp;

isAuth = async (req, res, next) => {
  // check if it's local request
  if (req.headers.islocalrequest === "yes") {
    const getServers = async () => {
      return await dbAll(`SELECT server_ip FROM servers`);
    };

    const servers = await getServers();
    if (servers.length > 0) {
      const serversArray = Object.values(servers).map((el) => el.server_ip);
      if (process.env.NODE_ENV === "development") {
        requesterIp = "localhost";
      } else {
        requesterIp = requesterIp ?? (await getRequesterIp());
      }

      // console.log(requesterIp);
      if (serversArray.includes(requesterIp)) {
        next();
      } else {
        return res.status(403).send({ message: "Wrong ip request!" });
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
