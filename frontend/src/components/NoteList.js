import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NoteList = () => {
    // State untuk menyimpan data catatan
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Fungsi untuk fetch data
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data pertama kali saat komponen dirender
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpdate = (note) => {
    navigate("/update", { state: { note } });  // Kirim data saat navigasi
  };

  const handleDelete = async (noteId) => {
    try {
        console.log("Deleting Note ID:", noteId);
        await axios.delete(`http://localhost:5000/delete-notes/${noteId}`);
        fetchNotes();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
    
  return (
    <div className="container mt-5">
      <h1 className="title has-text-centered">Notes</h1>
      <button className="button is-primary m-5 has-text-white" onClick={()=>{navigate("/add")}}>Add Note</button>
      <div className="columns is-multiline">
        {notes.map((note) => (
          <div key={note.id} className="column is-one-third">
            <div className="card">
              <div className="card-content">
                <p className="title is-5">{note.title}</p>
                <p className="subtitle is-6">{note.date}</p>
                <p>{note.description}</p>
                <div className="is-flex is-justify-content-center mt-4">
                    <button className="button has-background-link has-text-white m-5" onClick={()=>handleUpdate(note)}>Update Note</button>
                    <button className="button has-background-danger has-text-white m-5" onClick={() => handleDelete(note.id)}>Delete Note</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}

export default NoteList