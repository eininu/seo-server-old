const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");
const { dbAll, dbRun } = require("../database/database");
var FormData = require("form-data");
const axios = require("axios");
const archiver = require("archiver");
const mega = require("megajs");

const websitesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/websites/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.website + ".zip");
  },
});

const uploadWebsite = multer({ storage: websitesStorage });

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

  const lostNginxConfigs = nginxConfigFiles.reduce((acc, rec) => {
    const configName = rec.split(".conf")[0];

    if (!websitesFromDb.includes(configName)) {
      acc.push(configName);
    }
    return acc;
  }, []);

  const websiteUploadArchives = fs
    .readdirSync(process.cwd() + "/websites/uploads/")
    .map((el) => {
      return el;
    });

  const lostUploadArchives = websiteUploadArchives.reduce((acc, rec) => {
    const archiveName = rec.split(".zip")[0];
    if (!websitesFromDb.includes(archiveName)) {
      acc.push(archiveName);
    }
    return acc;
  }, []);

  const websitesDirectories = fs
    .readdirSync(process.cwd() + "/websites/")
    .reduce((acc, rec) => {
      if (rec !== "uploads") {
        acc.push(rec);
      }
      return acc;
    }, []);

  const lostWebsitesDirectories = websitesDirectories.reduce((acc, rec) => {
    if (!websitesFromDb.includes(rec)) {
      acc.push(rec);
    }
    return acc;
  }, []);

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
router.get("/remote", async (req, res) => {
  let remoteWebsites = [];

  await Promise.all(
    servers.map(async (server) => {
      const request = await fetch(`http://${server}/api/websites`);
      const requestJSON = await request.json();
      const websitesObj = {};
      websitesObj[server] = requestJSON.websitesFromDb;
      remoteWebsites.push(websitesObj);
    })
  );

  res.send(remoteWebsites);
});

router.post(
  "/",
  uploadWebsite.any(),
  async (req, res, next) => {
    const website = req.body.website;
    const nginxConfig = req.body.nginx_config;
    const files = req.files;
    const itsEditAction = req.body.is_edit === "yes";

    if (website.length === 0) {
      return res.send({ message: "Website cannot be blank" });
    }

    if (nginxConfig === undefined) {
      return res.send({ message: "Nginx Config cannot be blank" });
    }

    if (!itsEditAction && files.length === 0) {
      return res.send({ message: "website archive cannot be blank" });
    }

    fs.writeFileSync(
      process.cwd() + "/nginx-configs/" + website + ".conf",
      nginxConfig
    );

    await dbRun(`INSERT INTO websites(website) VALUES (?)`, [website]);
    if (!itsEditAction) {
      await decompress(
        process.cwd() + "/websites/uploads/" + website + ".zip",
        process.cwd() + "/websites/" + website
      );
    } else {
      if (fs.existsSync(process.cwd() + "/websites/" + website)) {
        fs.rmSync(process.cwd() + "/websites/" + website, {
          recursive: true,
          force: true,
        });
      } else {
        fs.mkdirSync(process.cwd() + "/websites/" + website);
      }
      await decompress(
        process.cwd() + "/websites/uploads/" + website + ".zip",
        process.cwd() + "/websites/" + website
      );
    }

    next();
  },
  async (req, res) => {
    const website = req.body.website;
    const nginxConfig = req.body.nginx_config;
    const itsEditAction = req.body.is_edit === "yes" ? "updated" : "created";

    if (servers.includes(req.ip)) {
      res.send({ message: `${website} ${itsEditAction} successfully` });
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

      res.send({ message: `${website} ${itsEditAction} successfully`, log });
    }
  }
);

router.get("/config/:website", (req, res) => {
  const website = req.params.website;

  const nginxConfig = fs.readFileSync(
    process.cwd() + "/nginx-configs/" + website + ".conf",
    "utf-8"
  );

  res.send({ nginxConfig });
});
router.get("/download/:website", (req, res) => {
  const website = req.params.website;

  res.download(process.cwd() + "/websites/uploads/" + website + ".zip");
});

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

router.use((req, res, next) => {
  if (!fs.existsSync(process.cwd() + "/public/uploads/")) {
    fs.mkdirSync(process.cwd() + "/public/uploads/");
  }
  next();
});

router.get("/export", async (req, res) => {
  // create a file to stream archive data to.
  const output = fs.createWriteStream(
    process.cwd() + "/public/uploads" + "/export_file.zip"
  );
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  output.on("end", function () {
    console.log("Data has been drained");
  });

  // good practice to catch this error explicitly
  archive.on("error", function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(process.cwd() + "/nginx-configs/", "/nginx-configs/");
  archive.directory(process.cwd() + "/websites/", "/websites/");

  const websitesTable = JSON.stringify(await dbAll(`SELECT * FROM websites`));

  await archive.append(`${websitesTable}`, { name: "websites.json" });

  archive.finalize().then((err) => {
    if (err) {
      res.send({ message: `${err}` });
    } else {
      var file = process.cwd() + "/public/uploads" + "/export_file.zip";

      var filestream = fs.createReadStream(file);

      filestream.on("end", function () {
        fs.unlinkSync(process.cwd() + "/public/uploads/" + "export_file.zip");
      });

      filestream.pipe(res);
      //
    }
  });
});

const backupStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "imported_backup" + ".zip");
  },
});

const downloadBackup = multer({ storage: backupStorage });
router.post("/import", downloadBackup.any(), async (req, res) => {
  decompress(
    process.cwd() + "/public/uploads/" + "imported_backup.zip",
    process.cwd(),
    {
      filter: (file) => {
        // file.path = `unicorn-${file.path}`;
        if (file.path === `websites.json`) {
          const websitesTable = JSON.parse(file.data.toString("utf-8"));
          websitesTable.map((websites_string) => {
            dbRun(
              `INSERT INTO websites (website) VALUES ('${websites_string.website}')`
            );
          });
        } else {
          if (
            file.path.startsWith("nginx-configs") ||
            file.path.startsWith("websites")
          ) {
            return file;
          }
        }
      },
    }
  ).then(() => {
    fs.unlinkSync(process.cwd() + "/public/uploads/" + "imported_backup.zip");
    res.send({ message: "Successfully imported" });
  });
});

router.use(
  "/backup",
  async (req, res, next) => {
    const output = fs.createWriteStream(
      process.cwd() + "/public/uploads" + "/backup.zip"
    );
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    });

    output.on("end", function () {
      console.log("Data has been drained");
    });

    // good practice to catch this error explicitly
    archive.on("error", function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    archive.directory(process.cwd() + "/nginx-configs/", "/nginx-configs/");
    archive.directory(process.cwd() + "/websites/", "/websites/");

    const websitesTable = JSON.stringify(await dbAll(`SELECT * FROM websites`));

    await archive.append(`${websitesTable}`, { name: "websites.json" });

    archive.finalize().then((err) => {
      if (err) {
        res.send({ message: `${err}` });
      } else {
        var file = process.cwd() + "/public/uploads" + "/backup.zip";

        var filestream = fs.createReadStream(file);

        filestream.on("end", function () {
          fs.unlinkSync(process.cwd() + "/public/uploads/" + "backup.zip");
        });

        // filestream.pipe(next());
        next();
      }
    });
  },
  async (req, res) => {
    let meganz_login;
    let meganz_password;
    try {
      meganz_login = (
        await dbAll(`SELECT value FROM settings WHERE key = 'meganz_login'`)
      )[0].value;
    } catch (err) {
      return res.send({ message: `meganz_login undefined` });
    }
    try {
      meganz_password = (
        await dbAll(`SELECT value FROM settings WHERE key = 'meganz_password'`)
      )[0].value;
    } catch (err) {
      return res.send({ message: `meganz_password undefined` });
    }

    if (!meganz_password || !meganz_login) {
      return res.send({ message: `undefined credentials` });
    }

    const { Storage } = { ...mega };

    let storage;
    try {
      storage = await new Storage({
        email: meganz_login,
        password: meganz_password,
      }).ready;
    } catch (err) {
      return res.send({ message: `${err}` });
    }

    const backupFile = fs.readFileSync(
      process.cwd() + "/public/uploads/backup.zip"
    );

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    const file = await storage.upload(
      "backup-" + currentDate + ".zip",
      backupFile
    ).complete;

    fs.unlinkSync(process.cwd() + "/public/uploads/backup.zip");

    return res.send({ message: "Backup was uploaded!" });
  }
);

module.exports = router;
