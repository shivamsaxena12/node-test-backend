const fs = require("fs");
const path = require("path");
const knexConfig = require("./../knexfile");
const knex = require("knex")(knexConfig.test);
const { getUserById } = require("../users/users");
const sqlite3 = require("sqlite3").verbose();

const TEST_DATABASE_PATH = path.join(__dirname, "testdatabase.db");

function createTestDb() {
  const testDb = new sqlite3.Database(TEST_DATABASE_PATH);

  testDb.serialize(function () {
    testDb.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, first_name TEXT)"
    );

    testDb.run(
      "CREATE TABLE IF NOT EXISTS phone (id INTEGER PRIMARY KEY, phone TEXT, userid INTEGER, FOREIGN KEY(userid) REFERENCES users(id))"
    );
  });

  testDb.close();
}

beforeAll(async () => {
  createTestDb();

  await new Promise((r) => setTimeout(r, 1000)); // Wait for the tables to be created

  await knex.migrate.latest();

  await knex("users").insert([
    { id: 1, first_name: "John", last_name: "Doe" },
    { id: 2, first_name: "Jane", last_name: "Jackson" },
  ]);
});

describe("getUserById", () => {
  it("should retrieve a user by ID", async () => {
    const id = 1;
    const user = await getUserById(id, knex);

    expect(user).toEqual({ id: 1, first_name: "John", last_name: "Doe" });
  });
});

afterAll(async () => {
  await knex("users").del();
  await knex.destroy();
  if (fs.existsSync(TEST_DATABASE_PATH)) {
    fs.unlinkSync(TEST_DATABASE_PATH);
  }
});
