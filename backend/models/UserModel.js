import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

// Membuat tabel "user"
const User = db.define(
  "user", // Nama Tabel
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  }
);

export default User;