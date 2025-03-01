import express from "express";
import { getAllNote, addNote, updateNote, deleteNote } from "../controllers/NoteController.js";

const router = express.Router();

//note
router.get("/notes", getAllNote);
router.post("/add-notes", addNote);
router.put("/update-notes/:id", updateNote);
router.delete("/delete-notes/:id", deleteNote);

export default router;
