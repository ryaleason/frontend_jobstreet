import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { Save, ArrowLeft, Briefcase, MapPin, Clock, Zap, Calendar } from 'lucide-react';

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const LowonganCreate = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama_kerja: "",
    deskripsi_kerja: "",
    lokasi: "",
    jam_kerja: "",
    skill_kerja: "",
    waktu_tenggang: ""
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API_BASE_URL}/perusahaan/${id}/lowongan/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/perusahaan/${id}/lowongan`);
    } catch (error) {
      alert('Gagal membuat data: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/perusahaan" className="hover:text-blue-600">Perusahaan</Link>
          <span className="mx-2">/</span>
          <Link to={`/perusahaan/${id}/lowongan`} className="hover:text-blue-600">Lowongan</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Buat Lowongan</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to={`/perusahaan/${id}/lowongan`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Buat Lowongan Baru</h1>
              <p className="text-gray-600 mt-1">Tambahkan detail lowongan pekerjaan</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Nama Kerja */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={16} />
                  Nama Pekerjaan
                </label>
                <input
                  type="text"
                  name="nama_kerja"
                  placeholder="Masukkan nama pekerjaan..."
                  value={form.nama_kerja}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} />
                  Lokasi
                </label>
                <input
                  type="text"
                  name="lokasi"
                  placeholder="Masukkan lokasi pekerjaan..."
                  value={form.lokasi}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Jam Kerja */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock size={16} />
                  Jam Kerja
                </label>
                <input
                  type="text"
                  name="jam_kerja"
                  placeholder="Contoh: 09:00 - 17:00 WIB"
                  value={form.jam_kerja}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Skill */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Zap size={16} />
                  Skill yang Dibutuhkan
                </label>
                <input
                  type="text"
                  name="skill_kerja"
                  placeholder="Contoh: JavaScript, React, Node.js"
                  value={form.skill_kerja}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Waktu Tenggang */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} />
                  Batas Waktu Pendaftaran
                </label>
                <input
                  type="date"
                  name="waktu_tenggang"
                  value={form.waktu_tenggang}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Pekerjaan
                </label>
                <textarea
                  name="deskripsi_kerja"
                  placeholder="Masukkan deskripsi lengkap tentang pekerjaan ini..."
                  value={form.deskripsi_kerja}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <Save size={18} />
                {loading ? 'Menyimpan...' : 'Simpan Lowongan'}
              </button>
              
              <Link
                to={`/perusahaan/${id}/lowongan`}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LowonganCreate;