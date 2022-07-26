const Sequelize = require("sequelize");

const db = new Sequelize("equipos_techo", "root", "LauLacayo!", {
  host: "localhost",
  dialect: "mysql"
});


module.exports = db;

