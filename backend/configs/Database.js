import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST: host, //34.132.179.173
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env

// Nyambungin db ke BE
const db = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

export default db;