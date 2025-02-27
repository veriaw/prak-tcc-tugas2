import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const UpdateNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state?.note || {}; // Menerima data dari navigasi

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    idUser: "1",
  });

  // Isi formData dengan data note yang diterima
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        description: note.description || "",
        date: note.date || "",
        idUser: note.idUser || "1", // Gunakan ID User jika ada
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-notes/${note.id}`, formData);
      navigate("/"); // Kembali ke halaman utama setelah update sukses
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <h2 className="title is-4">Update Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Update Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
