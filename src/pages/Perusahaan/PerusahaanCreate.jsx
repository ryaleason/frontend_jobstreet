import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { Save, ArrowLeft, Building2, FileText, Tag, Upload, Image } from 'lucide-react';

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const PerusahaanCreate = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    kategori: "",
    logo: null,
    tahun: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = e => {
    if (e.target.name === "logo") {
      const file = e.target.files[0];
      setForm({ ...form, logo: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("kategori", form.kategori);
    formData.append("deskripsi", form.deskripsi);
    formData.append("tahun", form.tahun);
    if (form.logo) {
      formData.append("logo", form.logo);
    }

    try {
      await axios.post(`${API_BASE_URL}/perusahaan/perusahaan`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      navigate("/dashboard/perusahaan");
    } catch (error) {
      console.error(error.response?.data);
      alert('Gagal membuat data: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/perusahaan" className="hover:text-blue-600">Perusahaan</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Buat Perusahaan</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/perusahaan"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Buat Perusahaan Baru</h1>
              <p className="text-gray-600 mt-1">Tambahkan informasi perusahaan</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Image size={16} />
                  Logo Perusahaan
                </label>
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload size={24} className="text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      name="logo"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Upload size={16} />
                      Pilih File
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Format: JPG, PNG, GIF. Maksimal 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={16} />
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama perusahaan..."
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Tag size={16} />
                  Kategori Perusahaan
                </label>
                <select
                  name="kategori"
                  value={form.kategori}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Pilih kategori perusahaan...</option>
                  <option value="Teknologi">Teknologi</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Manufaktur">Manufaktur</option>
                  <option value="Retail">Retail</option>
                  <option value="Konsultan">Konsultan</option>
                  <option value="Media">Media</option>
                  <option value="Transportasi">Transportasi</option>
                  <option value="Energi">Energi</option>
                  <option value="Properti">Properti</option>
                  <option value="Pariwisata">Pariwisata</option>
                  <option value="Perhotelan">Perhotelan</option>
                  <option value="Telekomunikasi">Telekomunikasi</option>
                  <option value="Agrikultur">Agrikultur</option>
                  <option value="Pertambangan">Pertambangan</option>
                  <option value="Perikanan">Perikanan</option>
                  <option value="Logistik">Logistik</option>
                  <option value="Otomotif">Otomotif</option>
                  <option value="Kimia">Kimia</option>
                  <option value="Farmasi">Farmasi</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Makanan & Minuman">Makanan & Minuman</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Asuransi">Asuransi</option>
                  <option value="Hukum">Hukum</option>
                  <option value="Non-Profit/NGO">Non-Profit / NGO</option>
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building2 size={16} />
                  Tahun Berdiri
                </label>
                <input
                  type="number"
                  name="tahun"
                  placeholder="Masukkan tahun perusahaan"
                  value={form.tahun}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

  
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} />
                  Deskripsi Perusahaan
                </label>
                <textarea
                  name="deskripsi"
                  placeholder="Masukkan deskripsi lengkap tentang perusahaan..."
                  value={form.deskripsi}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Jelaskan visi, misi, dan profil singkat perusahaan Anda.
                </p>
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
                {loading ? 'Menyimpan...' : 'Simpan Perusahaan'}
              </button>

              <Link
                to="/perusahaan"
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

export default PerusahaanCreate;