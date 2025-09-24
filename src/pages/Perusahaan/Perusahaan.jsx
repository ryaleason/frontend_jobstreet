import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Sesuaikan path jika perlu
import Sidebar from '../../components/Sidebar'; // Import sidebar
import { 
  Building2, 
  MapPin, 
  Users, 
  Briefcase, 
  Eye, 
  Trash2, 
  Plus,
  Star,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react';

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const Perusahaan = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const [countData , setCountData] = useState();

  const handleCount=async ()=>{
    const response = await axios.get("http://127.0.0.1:8000/api/perusahaan/datacount",{
      headers: {
        Authorization : `Bearer ${token}`
      }
    });

    setCountData(response.data)
  }

  useEffect(()=>{
    handleCount();
  },[])

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus perusahaan ini?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/perusahaan/perusahaan/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Refresh data setelah delete berhasil
        fetchData();
      } catch (error) {
        alert('Gagal menghapus data: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perusahaan/perusahaan`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      alert('Gagal memuat data: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const getCategoryIcon = (kategori) => {
    switch (kategori?.toLowerCase()) {
      case 'teknologi':
        return '💻';
      case 'keuangan':
        return '💰';
      case 'kesehatan':
        return '🏥';
      case 'pendidikan':
        return '🎓';
      case 'manufaktur':
        return '🏭';
      case 'retail':
        return '🛍️';
      case 'konsultan':
        return '💼';
      case 'media':
        return '📺';
      case 'transportasi':
        return '🚗';
      default:
        return '🏢';
    }
  };

  const getCompanyStats = () => {
    return {
      employees: Math.floor(Math.random() * 500) + 50,
      openJobs: Math.floor(Math.random() * 20) + 1,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      founded: Math.floor(Math.random() * 30) + 1994 // 1994 - 2024
    };
  };


  

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Daftar Perusahaan
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Building2 size={18} />
                Kelola dan pantau perusahaan mitra Anda
              </p>
            </div>
            
            <Link
              to="/perusahaan/create"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Tambah Perusahaan
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Perusahaan</p>
                  <p className="text-2xl font-bold text-gray-900">{countData?.perusahaanCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Perusahaan Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Briefcase size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Lowongan</p>
                  <p className="text-2xl font-bold text-gray-900">{countData?.lowonganCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Karyawan</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length * 127}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => {
            const stats = getCompanyStats();
            return (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="relative p-6 pb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-white/50 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.logo}`}
                          alt={`Logo ${item.nama}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center text-white font-bold text-xl hidden"
                        >
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors truncate">
                        {item.nama}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getCategoryIcon(item.kategori)}</span>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {item.kategori}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{stats.rating}</span>
                        <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 50) + 10} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus perusahaan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {item.deskripsi}
                  </p>
                </div>

                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <Users size={14} />
                      </div>
                      <p className="text-xs text-gray-500">Karyawan</p>
                      <p className="font-semibold text-gray-900">{stats.employees}+</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <Briefcase size={14} />
                      </div>
                      <p className="text-xs text-gray-500">Lowongan</p>
                      <p className="font-semibold text-gray-900">{item.lowongans_count}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                        <Calendar size={14} />
                      </div>
                      <p className="text-xs text-gray-500">Didirikan</p>
                      <p className="font-semibold text-gray-900">{item.tahun}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/perusahaan/${item.id}/lowongan`}
                    className="w-full group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Eye size={16} className="group-hover:scale-110 transition-transform" />
                    Lihat Lowongan
                  </Link>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
              </div>
            );
          })}
        </div>

        {data.length === 0 && (
          <div className="text-center py-16">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-white/20">
                <div className="text-8xl mb-6 animate-bounce">🏢</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">Belum ada perusahaan</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Mulai perjalanan rekrutmen Anda dengan menambahkan perusahaan pertama. 
                  Kelola lowongan dan temukan talenta terbaik!
                </p>
                <Link
                  to="/perusahaan/create"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus size={20} />
                  Tambah Perusahaan Pertama
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perusahaan;