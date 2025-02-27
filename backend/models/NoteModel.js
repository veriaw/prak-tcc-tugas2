import { Sequelize } from "sequelize";
import db from "../configs/Database.js";

// Membuat tabel "user"
const Note = db.define(
  "note", // Nama Tabel
  {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    date: Sequelize.DATEONLY,
    idUser: Sequelize.INTEGER,
  }
);

export default Note;