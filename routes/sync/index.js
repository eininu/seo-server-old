const express = require("express");
const router = express.Router();
const websitesSyncRouter = require("./websites");
const { dbAll } = require("../../database/database");

const getRequesterIp = async () => {
  let res = await fetch("https://myipv4.p1.opendns.com/get_my_ip");
  const resJson = await res.json();
  return `${resJson.ip}`;
};

let requesterIp;

const getAuthorizedIps = async () => {
  const serversObject = await dbAll(
    "SELECT server_ip FROM servers t LIMIT 501"
  );
  let serversArray = [];
  Object.values(serversObject).map((el) => {
    serversArray.push(el.server_ip);
  });

  return serversArray;
};

// if it's ip from servers database table --> provide request
// router.use(async (req, res, next) => {
//   requesterIp = requesterIp ?? (await getRequesterIp());
//   const servers = await getAuthorizedIps();
//
//   // console.log(requesterIp);
//   // console.log(servers);
//   // console.log(servers.includes(requesterIp));
//
//   if (!servers.includes(requesterIp)) {
//     res.send({
//       message:
//         "Remote server couldn't accept your request because your ip isn't included in",
//     });
//   } else {
//     next();
//   }
// });

router.use("/websites", websitesSyncRouter);

module.exports = router;
