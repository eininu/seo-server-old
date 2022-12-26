const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");

if (!fs.existsSync(process.cwd() + "/websites/uploads/")) {
  fs.mkdirSync(process.cwd() + "/websites/");
  fs.mkdirSync(process.cwd() + "/websites/uploads/");
}

if (!fs.existsSync(process.cwd() + "/nginx-configs/")) {
  fs.mkdirSync(process.cwd() + "/nginx-configs/");
}

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
    websites.push({ website: el.split(".conf")[0] });
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

router.delete("/", async (req, res) => {
  const website = req.body.website;

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

    res.send({ message: `${website} deleted` });
  } else {
    res.send({ message: `${website} doesn't exists` });
  }
});

module.exports = router;
