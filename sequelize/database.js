const { Sequelize, DataTypes } = require("sequelize");

// Initialize a new Sequelize instance
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Define a User model with an id and first_name column
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the `phone` model
const Phone = sequelize.define("phone", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Phone, { foreignKey: "userId" });
Phone.belongsTo(User, { foreignKey: "userId" });

// Create the table in the database
(async () => {
  await sequelize.sync({ force: true });
  console.log("User table created!");
})();
