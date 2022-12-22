const express = require("express");
const { dbRun, dbAll } = require("../database/database");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// const upload = multer({ dest: process.cwd() + "/websites/uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/websites/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.website + ".zip");
  },
});

const upload = multer({ storage: storage });
const checkIfTableExists = async () => {
  let tableExistings = await dbAll(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='websites';`
  );

  return tableExistings.length;
};
router.get("/", async (req, res) => {
  // checking that table websites exists in database

  let tableExistings = await checkIfTableExists();

  if (tableExistings === 0) {
    return res.send({ message: "The websites api isn't configured" });
  }

  return res.send({ message: "ok" });
});

router.get("/create_table", async (req, res) => {
  let tableExistings = await checkIfTableExists();

  if (tableExistings === 1) {
    return res.send({ message: "App currently configured" });
  }

  // dbRun(`DROP TABLE IF EXISTS websites`);
  await dbRun(`CREATE TABLE IF NOT EXISTS websites(website PRIMARY KEY)`);

  return res.send({ message: "Database table created successfully" });
});

router.get("/drop_table", async (req, res) => {
  await dbRun(`DROP TABLE IF EXISTS websites`);

  return res.send({ message: "Good!" });
});

router.post("/add", upload.any(), (req, res) => {
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

  // fs.writeFileSync(
  //   process.cwd() + "/nginx-configs/" + website + ".conf",
  //   nginxConfig
  // );

  if (files[0].mimetype !== "application/x-zip-compressed") {
    fs.unlinkSync(process.cwd() + "/websites/uploads/" + website + ".zip");

    return res.send({ message: "It should be zip archive!" });
  }
  console.log(files);
  res.send({ message: "ok" });
});

router.get("/delete/:website", (req, res) => {
  const website = req.params.website;

  const nginxConfPath = process.cwd() + "/nginx-configs/" + website + ".conf";
  const websiteArchivePath =
    process.cwd() + "/websites/uploads/" + website + ".zip";
  const websitePath = process.cwd() + "/websites/" + website;

  try {
    fs.unlink(nginxConfPath, (err) => {
      if (err) {
        console.log(`can't delete ==> ${nginxConfPath}`);
      } else {
        console.log(`deleted ==> ${nginxConfPath}`);
      }
    });
    fs.unlink(websiteArchivePath, (err) => {
      if (err) {
        console.log(`can't delete ==> ${websiteArchivePath}`);
      } else {
        console.log(`deleted ==> ${websiteArchivePath}`);
      }
    });
    fs.rm(
      websitePath,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          console.log(`can't delete ==> ${websitePath}`);
        } else {
          console.log(`deleted ==> ${websitePath}`);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.send({ message: err });
  }

  res.send({ message: `Website ${website} successfully deleted` });
});

module.exports = router;
