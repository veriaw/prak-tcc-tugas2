import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("notesapp", "root", "", {
  host: "34.132.179.173",
  dialect: "mysql",
});

export default db;