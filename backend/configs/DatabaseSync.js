import db from "./Database";

const syncDatabase = async () => {
    try {
      await db.sync({force:true});
      console.log("Database Synced!");
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  };
  
  export default syncDatabase;