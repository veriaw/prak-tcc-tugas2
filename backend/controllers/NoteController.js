import Note from "../models/NoteModel.js";

// GET
async function getAllNote(req, res) {
  try {
    const response = await Note.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// CREATE
async function addNote(req, res) {
  try {
    const inputNote = req.body;
    await Note.create(inputNote);
    res.status(201).json({ msg: "Note Created" });
  } catch (error) {
    console.log(error.message);
  }
}

async function updateNote(req, res){
  try{
    const updatedNote = req.body;
    await Note.update(
      updatedNote,
      {
        where: {
          id : req.params.id
        }
      }
    )
    res.status(201).json({ msg: "Note Updated" });
  }catch(error){
    console.log(error.message);
  }
}
  
async function deleteNote(req, res){
  try{
    const noteId = req.params.id;
    await Note.destroy(
      {
        where: {
          id: noteId
        }
      }
    )
    res.status(201).json({ msg: "Note Deleted" });
  }catch(error){
    console.log(error.message);
  }
}

export { getAllNote, addNote, updateNote, deleteNote };
