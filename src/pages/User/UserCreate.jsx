import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Sesuaikan path jika perlu

const API_BASE_URL =  'http://localhost:8000/api';

const UserCreate = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/users`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/user");
    } catch (error) {
      alert('Gagal membuat data: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Buat User</h1>
      <input name="name" placeholder="Nama" value={form.name} onChange={handleChange} />
      <input name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} />
      <input name="price" type="number" placeholder="Harga" value={form.price} onChange={handleChange} />
      <button type="submit">Simpan</button>
    </form>
  );
};

export default UserCreate;