const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");
const { dbAll } = require("../database/database");

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

router.post("/", upload.any(), (req, res) => {
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

  res.send({ message: "ok" });
});

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
    const serversFromDb = await dbAll(`SELECT t.* FROM servers t LIMIT 501`);
    const servers = serversFromDb.map((el) => el.server_ip);
    console.log(servers);

    if (servers.includes(req.ip)) {
      res.send({ message: `${website} deleted successfully` });
    } else {
      let log = [];
      await Promise.all(
        servers.map(async (server) => {
          const request = await fetch(`http://${server}/api/websites/`, {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9,ru;q=0.8",
              "content-type": "application/json; charset=utf-8",
            },
            body: `{\"website\":\"${website}\"}`,
            method: "DELETE",
          });
          log.push(await request.json());
        })
      );

      res.send({ message: `${website} deleted successfully`, log });
    }
  }
);

module.exports = router;
