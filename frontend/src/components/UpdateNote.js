import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utils";

const UpdateNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state?.note || {}; // Menerima data dari navigasi
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    idUser: "1",
  });

  // Membuat instance axios khusus untuk JWT
  const axiosJWT = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  // Interceptor akan dijalankan SETIAP KALI membuat request dengan axiosJWT
  // Fungsinya buat ngecek + memperbarui access token sebelum request dikirim
  axiosJWT.interceptors.request.use(
    async (config) => {
      // Ambil waktu sekarang, simpan dalam variabel "currentDate"
      const currentDate = new Date();

      // Bandingkan waktu expire token dengan waktu sekarang
      if (expire * 1000 < currentDate.getTime()) {
        // Kalo access token expire, Request token baru ke endpoint /token
        const response = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true   // wajib agar cookie terkirim & diterima
        });
        // Update header Authorization dengan access token baru
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;

        // Update token di state
        setToken(response.data.accessToken);

        // Decode token baru untuk mendapatkan informasi user
        const decoded = jwtDecode(response.data.accessToken);
        console.log(decoded);

        setExpire(decoded.exp); // <- Set waktu expire baru
      }
      return config;
    },
    (error) => {
      // Kalo misal ada error, langsung balik ke halaman login
      setToken("");
      navigate("/");
    }
  );

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
      await axiosJWT.put(`${BASE_URL}/update-notes/${note.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/notes"); // Kembali ke halaman utama setelah update sukses
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
