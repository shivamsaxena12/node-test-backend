module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./mydatabase.db",
    },
    useNullAsDefault: true,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: "./knex/tests/testdatabase.db",
      database: "testdatabase",
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
};
