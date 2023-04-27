const sqlite3 = require("sqlite3").verbose();

// Open a new database connection
const db = new sqlite3.Database("mydatabase.db");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, first_name TEXT)"
  );

  db.run(
    "CREATE TABLE IF NOT EXISTS phone (id INTEGER PRIMARY KEY, phone TEXT, userid INTEGER, FOREIGN KEY(userid) REFERENCES users(id))"
  );
});

// Close the database connection
db.close();
