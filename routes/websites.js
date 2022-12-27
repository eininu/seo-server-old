const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");
const { dbAll } = require("../database/database");
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
  const websites = [];

  fs.readdirSync(process.cwd() + "/nginx-configs/").map((el) => {
    websites.push(el.split(".conf")[0]);
  });
  res.json(websites);
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
  (req, res, next) => {
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

    decompress(
      process.cwd() + "/websites/uploads/" + website + ".zip",
      process.cwd() + "/websites/" + website
    );

    next();
  },
  async (req, res, next) => {
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

            axios
              .post("http://test.com/api/websites/", form, {
                headers: {
                  ...formHeaders,
                },
              })
              .then((response) => log.push(response.message))
              .catch((error) => error);
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

    const websites = fs
      .readdirSync(process.cwd() + "/nginx-configs/")
      .map((el) => {
        return el.split(".conf")[0];
      });

    if (websites.includes(website)) {
      fs.unlinkSync(process.cwd() + "/nginx-configs/" + website + ".conf");
      fs.unlinkSync(process.cwd() + "/websites/uploads/" + website + ".zip");
      fs.rmSync(process.cwd() + "/websites/" + website, {
        recursive: true,
        force: true,
      });

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
