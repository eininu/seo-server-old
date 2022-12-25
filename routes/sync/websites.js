const express = require("express");
const router = express.Router();
const { getServers } = require("../../modules/getServers");

// verify connection between webservers
// if websites connected - check connection between
const verifyConnection = () => {
  return true;
};

// compare websites between remote servers
// to get websites that should be added to current servers
router.post("/compare_websites", (req, res) => {
  verifyConnection();

  res.send({ message: "compare_websites" });
});

// download missing websites on the local server
// transfer missing websites to remote servers
router.post("/all", (req, res) => {
  verifyConnection();
  // check missing websites on local
  res.send({ message: "compare_websites" });
});

// add website to all remote servers
router.post("/add", (req, res) => {
  res.send({ message: "add website" });
});

// delete website from all remote servers
router.get("/delete/:website", async (req, res) => {
  const servers = await getServers();
  const serversArray = Object.values(servers).map((el) => el.server_ip);
  console.log(servers);
  const website = req.params.website;

  const result = await Promise.all(
    serversArray.map(async (server) => {
      let request = await fetch(
        `http://${server}/api/websites/delete/${website}`,
        {
          headers: {
            islocalrequest: "yes",
          },
          body: null,
          method: "GET",
        }
      );

      const requestJson = await request.json();

      return `${server}: ${requestJson.message}`;
    })
  );

  res.send(result);
});

module.exports = router;
