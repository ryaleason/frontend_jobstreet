import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Sesuaikan path jika perlu

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const LowonganDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lowongans/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data);
      } catch (error) {
        alert('Gagal memuat data: ' + (error.response?.data?.message || error.message));
      }
    };
    if (token) fetchData();
  }, [id, token]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Detail Lowongan</h1>
      <p>Nama: {data.name}</p>
      <p>Deskripsi: {data.description}</p>
      <p>Harga: {data.price}</p>
    </div>
  );
};

export default LowonganDetail;