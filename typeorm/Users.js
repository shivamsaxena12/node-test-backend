const { EntitySchema } = require("typeorm");

class User {
  constructor(id, first_name) {
    this.id = id;
    this.first_name = first_name;
  }
}

const UserSchema = new EntitySchema({
  name: "User",
  target: User,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "varchar",
    },
  },
});

module.exports = {
  User,
  UserSchema,
};
