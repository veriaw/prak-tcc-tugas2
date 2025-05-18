import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from '../utils';

const NoteList = () => {
    // State untuk menyimpan data catatan
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

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
      console.log(currentDate);
      // Bandingkan waktu expire token dengan waktu sekarang
      if (expire * 1000 < currentDate.getTime()) {
        // Kalo access token expire, Request token baru ke endpoint /token
        const response = await axios.get(`${BASE_URL}/token`, {
          withCredentials: true   // wajib agar cookie terkirim & diterima
        });
        console.log(response);
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

  // Fetch data pertama kali saat komponen dirender
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fungsi untuk fetch data
  const fetchNotes = async () => {
    try {
      console.log(token);
      const response = await axiosJWT.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Logout = async () => {
    try {
      await axios.delete(`${BASE_URL}/logout`, {
          withCredentials: true   // wajib agar cookie terkirim & diterima
        });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (note) => {
    navigate("/update", { state: { note } });  // Kirim data saat navigasi
  };

  const handleDelete = async (noteId) => {
    try {
        console.log("Deleting Note ID:", noteId);
        await axiosJWT.delete(`${BASE_URL}/delete-notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
        fetchNotes();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
    
  return (
    <div className="container mt-5">
      <div className="m-5" style={{ position: 'relative', textAlign: 'center' }}>
        <h1 className="title">Notes</h1>
        <button
          className="button is-danger"
          onClick={Logout}
          style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        >
          Logout
        </button>
      </div>
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