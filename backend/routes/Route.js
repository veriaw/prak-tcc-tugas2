import express from "express";
import { getAllNote, addNote, updateNote, deleteNote } from "../controllers/NoteController.js";
import { Register, Login, refreshToken, logout } from "../controllers/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAccessToken } from "../controllers/TokenController.js";

const router = express.Router();

router.get("/token", getAccessToken);

// User Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

//note
router.get("/notes", verifyToken, getAllNote);
router.post("/add-notes", verifyToken, addNote);
router.put("/update-notes/:id", verifyToken, updateNote);
router.delete("/delete-notes/:id", verifyToken, deleteNote);

router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
