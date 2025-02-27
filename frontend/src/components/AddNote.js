import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const AddNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    idUser:"1"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-notes", formData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="box">
        <h2 className="title is-4">Add Note</h2>
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
