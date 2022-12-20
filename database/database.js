// Load modules
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Connect with SQLite database
const db_path = path.join(__dirname, "../database", "database.sqlite");

if (!fs.existsSync(db_path)) {
  fs.writeFileSync(db_path, "");
  console.log("database.sqlite created");
}

const appDatabase = new sqlite3.Database(
  db_path,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Successful connected to the database");
  }
);

const dbRun = (query, data) => {
  try {
    appDatabase.serialize(() => {
      appDatabase.run(query, data, (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });

    console.log(`DB ==> ${query}`);
    // appDatabase.close();
  } catch (err) {
    console.error(err.message);
  }
};

const dbAll = (query, data) => {
  return new Promise((resolve) => {
    appDatabase.all(query, data, (err, rows) => {
      resolve(rows);
    });
  });
};

// Export database object
module.exports = { dbRun, dbAll };
