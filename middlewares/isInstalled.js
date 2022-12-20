const { dbAll } = require("../database/database");

isInstalled = async (req, res, next) => {
  const config_table_data = await dbAll(`SELECT * FROM config`);

  if (config_table_data === undefined && req.baseUrl !== "/api/setup") {
    return res.status(200).send({ message: "The app isn't installed!" });
  }

  if (config_table_data && req.baseUrl === "/api/setup") {
    return res.status(200).send({ message: "The app is already installed!" });
  }

  next();
};

const setupStatus = isInstalled;

module.exports = setupStatus;
