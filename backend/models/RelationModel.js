import db from "../configs/Database.js";
import Users from "./UserModel.js";
import Note from "./NoteModel.js";

Users.hasMany(Note, {foreignKey: "idUser", onDelete:"CASCADE"});
Note.belongsTo(Users, {foreignKey: "idUser"});

(async () => {
    try{
        await db.authenticate();
        console.log("Koneksi database berhasil!");

        await db.sync({alter: true});
        console.log("Semua tabel berhasil disinkronisasi");
    }catch(err){
        console.log(`Gagal Connect : ${err}`);
    }
})();

export {Users, Note};