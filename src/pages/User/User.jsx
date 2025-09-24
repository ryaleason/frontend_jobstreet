import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';


import { User as UserIcon, Mail, Phone, MapPin, Camera, Save, ArrowLeft } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const User = () => {
  const navigate = useNavigate();
  const { token,user } = useContext(AuthContext);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomor: "",
    jenis_kelamin: "",
    domisili: "",
    foto_profil: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm(response.data);

      } catch (error) {
        alert('Gagal memuat data: ' + (error.response?.data?.message || error.message));
      }
    };
    if (token) fetchData();
  }, [ token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/user/profile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
       Swal.fire({
      title: "Success!",
      text: "Profil berhasil diperbarui",
      icon: "success",
      confirmButtonText: "OK"
    });

      navigate(`/user/profile`);
    } catch (error) {
      alert('Gagal update data: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {user?.role === "Perusahaan" ?(
        <Sidebar />
      ):(
        <Navbar/>
      )}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
                <p className="text-gray-600">Update your personal information and preferences</p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <UserIcon size={32} className="text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors duration-200">
                    <Camera size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                  <p className="text-gray-600 text-sm mb-4">Upload a new profile picture to personalize your account</p>
                  <div className="flex items-center space-x-4">
                    <label className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                      <span>Choose File</span>
                      <input
                        name="foto_profil"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                      />
                    </label>
                    <span className="text-gray-500 text-sm">JPG, PNG up to 10MB</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <UserIcon size={20} className="mr-3 text-blue-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="nama"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.nama}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={form.email}
                      disabled
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="nomor"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.nomor}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domisili
                  </label>
                  <div className="relative">
                    <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="domisili"
                      type="text"
                      placeholder="Enter your location"
                      value={form.domisili}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg"
              >
                <Save size={20} />
                <span>Update Profile</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default User;