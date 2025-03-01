import db from "./Database.js";
import "../models/NoteModel.js";  // Pastikan model ini di-import!

const syncDatabase = async () => {
    try {
      console.log("🚀 Syncing database...");
      await db.sync({ alter: true });  // `alter: true` akan memperbarui tabel jika ada perubahan
      console.log("✅ Database Synced!");
    } catch (error) {
      console.error("❌ Error syncing database:", error);
    }
};

export default syncDatabase;