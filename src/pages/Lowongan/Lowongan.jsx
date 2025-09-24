import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { 
  Edit, 
  Trash2, 
  Clock, 
  MapPin, 
  Calendar, 
  Zap, 
  Plus,
  Briefcase,
  DollarSign,
  Users,
  Star,
  Eye,
  TrendingUp,
  Building2,
  ArrowLeft,
  Timer,
  Award,
  Target,
  Search,
  Filter,
  X
} from 'lucide-react';

const API_BASE_URL = 'https://ryal-jobstreet.rakarawr.com/api';

const Lowongan = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [company, setCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/perusahaan/${id}/lowongan`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data.lowongan);
      setFilteredData(response.data.lowongan);
      setCompany(response.data.perusahaan);
    } catch (error) {
      console.error(error.response?.data);
      alert('Gagal memuat data: ' + (error.response?.data?.message || error.message));
    }
  };

  // Search and filter function
  const handleSearch = (searchValue, filterValue = filterBy) => {
    let filtered = [...data];

    // Apply search filter
    if (searchValue.trim()) {
      filtered = filtered.filter(item =>
        item.nama_kerja.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.skill_kerja.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.deskripsi_kerja.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply category filter
    if (filterValue !== 'all') {
      filtered = filtered.filter(item => {
        const title = item.nama_kerja.toLowerCase();
        switch (filterValue) {
          case 'tech':
            return title.includes('developer') || title.includes('programmer') || title.includes('engineer');
          case 'design':
            return title.includes('designer') || title.includes('ui') || title.includes('ux');
          case 'marketing':
            return title.includes('marketing') || title.includes('sales');
          case 'management':
            return title.includes('manager') || title.includes('lead') || title.includes('director');
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilterBy('all');
    setFilteredData(data);
  };

  useEffect(() => {
    if (token && id) fetchData();
  }, [token, id]);

  // Update filtered data when search term or filter changes
  useEffect(() => {
    handleSearch(searchTerm, filterBy);
  }, [searchTerm, filterBy, data]);

  const handleDelete = async (lowonganId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
      try {
        await axios.delete(`${API_BASE_URL}/perusahaan/lowongan/${lowonganId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (error) {
        alert('Gagal menghapus data: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Get job type icon based on job title
  const getJobIcon = (jobTitle) => {
    const title = jobTitle.toLowerCase();
    if (title.includes('developer') || title.includes('programmer')) return '💻';
    if (title.includes('designer')) return '🎨';
    if (title.includes('manager')) return '👔';
    if (title.includes('marketing')) return '📢';
    if (title.includes('sales')) return '💼';
    if (title.includes('hr') || title.includes('human')) return '👥';
    if (title.includes('finance') || title.includes('accountant')) return '💰';
    if (title.includes('engineer')) return '⚙️';
    if (title.includes('analyst')) return '📊';
    return '💼';
  };

  // Get urgency level based on deadline
  const getUrgencyLevel = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) return { level: 'urgent', color: 'red', text: 'Urgent' };
    if (daysLeft <= 7) return { level: 'moderate', color: 'orange', text: 'Segera' };
    return { level: 'normal', color: 'green', text: 'Normal' };
  };

  // Generate random job stats (simulation)
  const getJobStats = () => {
    return {
      applicants: Math.floor(Math.random() * 50) + 5,
      views: Math.floor(Math.random() * 200) + 20,
      salary: `${Math.floor(Math.random() * 10) + 5}-${Math.floor(Math.random() * 15) + 10} Juta`,
      experience: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 3} Tahun`
    };
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <nav className="flex items-center mb-6 text-sm text-gray-500">
          <Link to="/perusahaan" className="hover:text-blue-600 transition-colors">
            Perusahaan
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">
            {company?.nama || 'Lowongan Pekerjaan'}
          </span>
        </nav>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/perusahaan"
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            
            {company && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md border-2 border-white/50 overflow-hidden">
                  <img
                    src={`https://ryal-jobstreet.rakarawr.com/storage/${company.logo}`}
                    alt={`Logo ${company.nama}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center text-white font-bold text-lg hidden">
                    {company.nama.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{company.nama}</h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Building2 size={16} />
                    Lowongan Pekerjaan Aktif
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Lowongan</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pelamar</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length * 15}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length * 89}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">{data.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari lowongan, lokasi, atau skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/80"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white/80 min-w-[150px]"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="tech">Teknologi</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="management">Management</option>
                </select>
              </div>

              <div className="text-sm text-gray-600 whitespace-nowrap">
                {filteredData.length} dari {data.length} lowongan
              </div>
            </div>

            {(searchTerm || filterBy !== 'all') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Filter aktif:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                {filterBy !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {filterBy}
                    <button onClick={() => setFilterBy('all')}>
                      <X size={14} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearSearch}
                  className="text-sm text-red-600 hover:text-red-700 ml-2"
                >
                  Hapus semua
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-end mb-6">
            <Link
              to={`/perusahaan/${id}/lowongan/create`}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Tambah Lowongan
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item) => {
              const stats = getJobStats();
              const urgency = getUrgencyLevel(item.waktu_tenggang);
              return (
                <div
                  key={item.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative p-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60"></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl bg-white/80 p-2 rounded-lg shadow-sm">
                              {getJobIcon(item.nama_kerja)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight truncate">
                                {item.nama_kerja}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin size={12} className="text-gray-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600 truncate">{item.lokasi}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              urgency.color === 'red' ? 'bg-red-100 text-red-700' :
                              urgency.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              <Timer size={10} />
                              {urgency.text}
                            </div>
                            
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              <Target size={10} />
                              {Math.floor(Math.random() * 3) + 1} Posisi
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 ml-2">
                          <Link
                            to={`/perusahaan/lowongan/${item.id}/edit`}
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit lowongan"
                          >
                            <Edit size={14} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus lowongan"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.deskripsi_kerja}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50/80 text-blue-700 rounded-lg text-xs font-medium">
                          <Clock size={10} />
                          {item.jam_kerja}
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50/80 text-green-700 rounded-lg text-xs font-medium truncate">
                          <Zap size={10} />
                          <span className="truncate max-w-[80px]">{item.skill_kerja}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50/80 text-orange-700 rounded-lg text-xs font-medium">
                          <DollarSign size={10} />
                          {stats.salary}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50/80 text-purple-700 rounded-xl text-xs font-medium mb-4">
                        <Calendar size={12} />
                        Deadline: {new Date(item.waktu_tenggang).toLocaleDateString('id-ID')}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                            <Users size={12} />
                          </div>
                          <p className="text-xs text-gray-500">Pelamar</p>
                          <p className="font-semibold text-gray-900 text-sm">{stats.applicants}</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                            <Eye size={12} />
                          </div>
                          <p className="text-xs text-gray-500">Views</p>
                          <p className="font-semibold text-gray-900 text-sm">{stats.views}</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-blue-100 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-white/20">
                    <div className="text-8xl mb-6 animate-bounce">
                      {searchTerm || filterBy !== 'all' ? '🔍' : '📋'}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                      {searchTerm || filterBy !== 'all' 
                        ? 'Tidak ada lowongan yang sesuai' 
                        : 'Belum ada lowongan'}
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      {searchTerm || filterBy !== 'all'
                        ? `Coba ubah kata kunci pencarian atau filter untuk melihat hasil yang berbeda.`
                        : 'Mulai menarik talenta terbaik dengan membuat lowongan pekerjaan pertama untuk perusahaan ini.'}
                    </p>
                    
                    {searchTerm || filterBy !== 'all' ? (
                      <button
                        onClick={clearSearch}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <X size={20} />
                        Hapus Filter
                      </button>
                    ) : (
                      <Link
                        to={`/perusahaan/${id}/lowongan/create`}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <Plus size={20} />
                        Buat Lowongan Pertama
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Lowongan;