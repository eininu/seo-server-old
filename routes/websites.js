const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");
const { dbAll, dbRun } = require("../database/database");
var FormData = require("form-data");
const axios = require("axios");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/websites/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.website + ".zip");
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const websitesFromDb = (
    await dbAll(`SELECT t.*
      FROM websites t
      ORDER BY website
      LIMIT 501`)
  ).map((el) => `${el.website}`);

  const nginxConfigFiles = fs
    .readdirSync(process.cwd() + "/nginx-configs/")
    .map((el) => {
      return el;
    });

  const lostNginxConfigs = nginxConfigFiles.map((el) => {
    const configName = el.split(".conf")[0];

    if (!websitesFromDb.includes(configName)) {
      console.log(el);
      return el;
    }
  });

  const websiteUploadArchives = fs
    .readdirSync(process.cwd() + "/websites/uploads/")
    .map((el) => {
      return el;
    });

  const lostUploadArchives = websiteUploadArchives.map((el) => {
    const archiveName = el.split(".zip")[0];
    if (!websitesFromDb.includes(archiveName)) {
      return el;
    }
  });

  const websitesDirectories = fs
    .readdirSync(process.cwd() + "/websites/")
    .reduce((acc, rec) => {
      if (rec !== "uploads") {
        acc.push(rec);
      }
      return acc;
    }, []);

  const lostWebsitesDirectories = websitesDirectories.map((el) => {
    if (!websitesFromDb.includes(el)) {
      return el;
    }
  });

  res.send({
    websitesFromDb,
    lostNginxConfigs,
    lostUploadArchives,
    lostWebsitesDirectories,
  });
});

let serversFromDb;
let servers;
router.use(async (req, res, next) => {
  serversFromDb = await dbAll(`SELECT t.* FROM servers t LIMIT 501`);
  servers = serversFromDb.map((el) => el.server_ip);
  next();
});

router.post(
  "/",
  upload.any(),
  async (req, res, next) => {
    const website = req.body.website;
    const nginxConfig = req.body.nginx_config;
    const files = req.files;

    if (website.length === 0) {
      return res.send({ message: "Website cannot be blank" });
    }

    if (nginxConfig === undefined) {
      return res.send({ message: "Nginx Config cannot be blank" });
    }

    if (files.length === 0) {
      return res.send({ message: "website archive cannot be blank" });
    }

    fs.writeFileSync(
      process.cwd() + "/nginx-configs/" + website + ".conf",
      nginxConfig
    );

    await dbRun(`INSERT INTO websites(website) VALUES (?)`, [website]);

    await decompress(
      process.cwd() + "/websites/uploads/" + website + ".zip",
      process.cwd() + "/websites/" + website
    );

    next();
  },
  async (req, res) => {
    const website = req.body.website;
    const nginxConfig = req.body.nginx_config;

    if (servers.includes(req.ip)) {
      res.send({ message: `${website} created successfully` });
    } else {
      let log = [];

      await Promise.all(
        servers.map(async (server) => {
          try {
            var form = new FormData();
            form.append("website", website);
            form.append("nginx_config", nginxConfig);
            form.append(
              "files",
              fs.createReadStream(
                process.cwd() + "/websites/uploads/" + website + ".zip"
              )
            );

            const formHeaders = form.getHeaders();

            const request = await axios.post(
              `http://${server}/api/websites/`,
              form,
              {
                headers: {
                  ...formHeaders,
                },
              }
            );
            log.push(server + ": " + `${request.data.message}`);
          } catch (err) {
            log.push(server + ": " + `${err}`);
          }
        })
      );

      res.send({ message: `${website} created successfully`, log });
    }
  }
);

router.delete(
  "/",
  async (req, res, next) => {
    const website = req.body.website;
    // initiator
    // executor

    const websitesFromDB = await dbAll(`SELECT t.*
      FROM websites t
      ORDER BY website
      LIMIT 501`);
    const websites = await websitesFromDB.map((el) => `${el.website}`);
    console.log(websitesFromDB);
    if (websites.includes(website)) {
      try {
        fs.unlinkSync(process.cwd() + "/nginx-configs/" + website + ".conf");
      } catch (err) {
        console.log(err);
      }

      try {
        fs.unlinkSync(process.cwd() + "/websites/uploads/" + website + ".zip");
      } catch (err) {
        console.log(err);
      }

      try {
        fs.rmSync(process.cwd() + "/websites/" + website, {
          recursive: true,
          force: true,
        });
      } catch (err) {
        console.log(err);
      }

      try {
        await dbRun(`DELETE
                     FROM websites
                     WHERE website = '${website}';`);
      } catch (err) {
        console.log(err);
      }

      next();
    } else {
      res.send({ message: `${website} doesn't exists` });
    }
  },
  async (req, res) => {
    const website = req.body.website;

    if (servers.includes(req.ip)) {
      res.send({ message: `${website} deleted successfully` });
    } else {
      let log = [];

      await Promise.all(
        servers.map(async (server) => {
          try {
            const request = await fetch(`http://${server}/api/websites/`, {
              headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9,ru;q=0.8",
                "content-type": "application/json; charset=utf-8",
              },
              body: `{\"website\":\"${website}\"}`,
              method: "DELETE",
            });
            const requestJson = await request.json();

            log.push(server + ": " + requestJson.message);
          } catch (err) {
            log.push(server + ": " + `${err}`);
          }
        })
      );

      res.send({ message: `${website} deleted successfully`, log });
    }
  }
);

module.exports = router;
