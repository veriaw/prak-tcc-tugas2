import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://notes-backend-veriaw-928661779459.us-central1.run.app/login`, {
        username: username,
        password: password,
      }, {
        withCredentials: true   // wajib agar cookie terkirim & diterima
        });

      console.log(response);

      // Kalo berhasil login
      navigate("/notes");   
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <h1 className="title has-text-centered">Login</h1>
          <form onSubmit={login} className="box">
            {error && (
              <div className="notification is-danger">
                {error}
              </div>
            )}
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth">Login</button>
                <h2 className='mx-2'>Belum Punya Akun?</h2>
                <button className="button is-primary is-fullwidth mt-2" onClick={()=>{navigate("/register")}}>Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;