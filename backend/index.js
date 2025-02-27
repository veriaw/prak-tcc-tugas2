import express from "express";
import cors from "cors";
import UserRoute from "./routes/Route.js";
import syncDatabase from "./configs/syncDatabase.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRoute);

syncDatabase();

app.listen(5000, () => console.log("Server connected"));
