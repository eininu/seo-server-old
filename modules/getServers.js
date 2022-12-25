const { dbAll } = require("../database/database");
getServers = async () => {
  return await dbAll(`SELECT server_ip FROM servers`);
};

module.exports = { getServers };
