const express = require("express");
const { dbRun, dbAll } = require("../database/database");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const decompress = require("decompress");
const { getServers } = require("../modules/getServers");
const requestIp = require("request-ip");

let clientIp;

router.use((req, res, next) => {
  clientIp = requestIp.getClientIp(req);
  next();
});

if (!fs.existsSync(process.cwd() + "/websites/uploads/")) {
  fs.mkdirSync(process.cwd() + "/websites/");
  fs.mkdirSync(process.cwd() + "/websites/uploads/");
}

if (!fs.existsSync(process.cwd() + "/nginx-configs/")) {
  fs.mkdirSync(process.cwd() + "/nginx-configs/");
}
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

router.get("/list", async (req, res) => {
  const websites = [];

  fs.readdirSync(process.cwd() + "/nginx-configs/").map((el) => {
    websites.push({ website: el.split(".conf")[0] });
  });
  res.json(websites);
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

  fs.writeFileSync(
    process.cwd() + "/nginx-configs/" + website + ".conf",
    nginxConfig
  );

  // if (files[0].mimetype !== "application/x-zip-compressed") {
  //   fs.unlinkSync(process.cwd() + "/websites/uploads/" + website + ".zip");
  //
  //   return res.send({ message: "It should be zip archive!" });
  // }

  decompress(
    process.cwd() + "/websites/uploads/" + website + ".zip",
    process.cwd() + "/websites/" + website
  );

  // fs.unlinkSync(process.cwd() + "/websites/uploads/" + website + ".zip");
  // .then((files) => {
  //   console.log(files);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // console.log(files);
  res.send({ message: "ok" });
});

router.get("/delete/:website", async (req, res) => {
  const website = req.params.website;

  const deleteWebsite = async () => {
    const nginxConfPath = process.cwd() + "/nginx-configs/" + website + ".conf";
    const websiteArchivePath =
      process.cwd() + "/websites/uploads/" + website + ".zip";
    const websitePath = process.cwd() + "/websites/" + website;

    // const log = [];

    await fs.unlink(nginxConfPath, (err) => {
      if (err) {
        return nginxConfPath + " doesn't exists";
      } else {
        // log.push(`deleted ==> ${nginxConfPath}`);
        if (process.env.NODE_ENV === "development") {
          console.log(`deleted ==> ${nginxConfPath}`);
        }
      }
    });
    await fs.unlink(websiteArchivePath, (err) => {
      if (err) {
        return websiteArchivePath + " doesn't exists";
      } else {
        // log.push(`deleted ==> ${websiteArchivePath}`);
        if (process.env.NODE_ENV === "development") {
          console.log(`deleted ==> ${websiteArchivePath}`);
        }
      }
    });
    await fs.rm(
      websitePath,
      {
        recursive: true,
        force: true,
      },
      (err) => {
        if (err) {
          return websitePath + " doesn't exists";
        } else {
          // log.push(`deleted ==> ${websitePath}`);
          if (process.env.NODE_ENV === "development") {
            console.log(`deleted ==> ${websitePath}`);
          }
        }
      }
    );

    return website + " deleted successfully";
  };
  const websites = fs
    .readdirSync(process.cwd() + "/nginx-configs/")
    .map((el) => {
      return el.split(".conf")[0];
    });
  //

  const servers = await getServers();
  if (servers.length > 0) {
    const deleteOnServers = async () => {
      const log = [];
      const result = Promise.all(
        servers.map(async (server) => {
          let requestWebsites = await fetch(
            `http://${server.server_ip}/api/websites/list`,
            {
              headers: {
                islocalrequest: "yes",
              },
              body: null,
              method: "GET",
            }
          );
          const websitesObject = await requestWebsites.json();
          const websitesArr = websitesObject.map((el) => el.website);

          if (websitesArr.includes(website)) {
            let request = await fetch(
              `http://${server.server_ip}/api/websites/delete/${website}`,
              {
                headers: {
                  islocalrequest: "yes",
                },
                body: null,
                method: "GET",
              }
            );

            const requestJson = await request.json();

            log.push(`${server.server_ip}: ${requestJson.message}`);
          }
        })
      );
      await result;
      return log;
    };

    // const deleteOnServers = async () => {};

    if (websites.includes(website)) {
      const result = await deleteWebsite();
      const log = await deleteOnServers();
      res.send({ message: result, log });
    } else {
      res.send({ message: `${website} doesn't exists` });
    }
  }

  // run task on another servers if we have them on database
  // const servers = await getServers();
  //
  // let result = [];
  //
  // const websites = fs.readdirSync(process.cwd() + "/nginx-configs/").map((el) => {
  //   websites.push(el.split(".conf")[0]);
  // });
  //
  // console.log(website);
  // console.log(websites);
  // console.log(websites.includes(website));
  // if (websites.includes(website)) {
  //   const serversArray = Object.values(servers).map((el) => el.server_ip);
  //   // console.log(servers);
  //
  //   result = await Promise.all(
  //     serversArray.map(async (server) => {
  //       try {
  //         let request = await fetch(
  //           `http://${server}/api/websites/delete/${website}`,
  //           {
  //             headers: {
  //               islocalrequest: "yes",
  //             },
  //             body: null,
  //             method: "GET",
  //           }
  //         );
  //
  //         const requestJson = await request.json();
  //
  //         return `${server}: ${requestJson.message}`;
  //       } catch (e) {
  //         return e;
  //       }
  //     })
  //   );
  // } else {
  //   result.push(`Website ${website} doesn't exists`);
  // }
});

module.exports = router;
