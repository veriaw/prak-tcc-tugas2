import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/register`, {
        username,
        password,
        confirmPassword
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      }
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="column is-half is-offset-one-quarter">
          <h1 className="title has-text-centered">Registrasi</h1>
          <form onSubmit={Register} className="box">

            {error && (
              <div className="notification is-danger">
                {error}
              </div>
            )}

            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan username"
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
              <label className="label">Konfirmasi Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Ulangi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth">
                  Daftar
                </button>
                <h2 className='mx-2'>Sudah Punya Akun?</h2>
                <button className="button is-primary is-fullwidth mt-2" onClick={()=>{navigate("/")}}>
                  Login
                </button>
              </div>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;