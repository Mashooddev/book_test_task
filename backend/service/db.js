const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "root", {
  host: "localhost",
  dialect: "postgres", // Or any other dialect
});
module.exports = sequelize;
