import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Building, Calendar, ChevronRight, Clock, Filter, MapPin, Search } from 'lucide-react';

const Home = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [detail, setDetail] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const handel = async () => {
    try {
      const response = await axios.get("https://ryal-jobstreet.rakarawr.com/api/user/lowongan");
      setData(response.data);
    } catch (error) {
      alert(error)
    }

  }

  const handleDetail = async (job) => {
  const response = await axios.get(`https://ryal-jobstreet.rakarawr.com/api/user/lowongan/${job.id}`);
  setDetail(response.data);
  setSelectedJob(job.id);
};

  useEffect(() => {
    handel();
  }, [])

  const getJobTypeColor = (jamKerja) => {
        switch (jamKerja) {
            case 'Full Time':
                return 'bg-green-100 text-green-700';
            case 'Part Time':
                return 'bg-yellow-100 text-yellow-700';
            case 'Remote':
                return 'bg-purple-100 text-purple-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />
            
            <div className="pt-16 pb-8 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Temukan Karir Impian Anda
                        </h1>
                        <p className="text-xl opacity-90 mb-8">
                            Ribuan lowongan kerja menanti Anda
                        </p>
                        
                        <div className="max-w-2xl mx-auto">
                            <div className="flex gap-3 bg-white rounded-full p-2 shadow-xl">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Contoh: Web Programming, UI/UX Designer..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 text-gray-700 rounded-full focus:outline-none"
                                    />
                                </div>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Cari Lowongan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Lowongan Terbaru</h2>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {data.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => handleDetail(job)}
                                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer border-2 transform hover:scale-[1.02] ${
                                        selectedJob === job.id ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-blue-200'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                            <Building className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                                                {job.nama_kerja}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {job.deskripsi_kerja}
                                            </p>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <MapPin className="w-4 h-4" />
                                                    {job.lokasi}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jam_kerja)}`}>
                                                        {job.jam_kerja}
                                                    </span>
                                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
                            {detail ? (
                                <div className="p-8">
                                    <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-100">
                                            <img src={`https://ryal-jobstreet.rakarawr.com/storage/${detail.perusahaan.logo}`} className="w-12 h-12 rounded-xl text-blue-600" />
                                        <div className="flex-1">
                                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                                {detail.nama_kerja}
                                            </h1>
                                            <p className="text-lg text-blue-600 font-medium mb-2">
                                                {detail.perusahaan?.nama}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {detail.lokasi}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(detail.jam_kerja)}`}>
                                                    {detail.jam_kerja}
                                                </span>
                                            </div>
                                        </div>
                                        <Link to={`/lamaran/${detail.id}`}  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                                            Lamar Sekarang
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                Informasi Pekerjaan
                                            </h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm text-gray-500">Jam Kerja:</span>
                                                    <p className="font-medium text-gray-800">{detail.jam_kerja}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Lokasi:</span>
                                                    <p className="font-medium text-gray-800">{detail.lokasi}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        Deadline:
                                                    </span>
                                                    <p className="font-medium text-red-600">{detail.waktu_tenggang}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Building className="w-5 h-5 text-blue-600" />
                                                Tentang Perusahaan
                                            </h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="text-sm text-gray-500">Nama Perusahaan:</span>
                                                    <p className="font-medium text-gray-800">{detail.perusahaan?.nama}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Kategori:</span>
                                                    <p className="font-medium text-gray-800">{detail.perusahaan?.kategori}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="font-semibold text-gray-800 mb-4">Deskripsi Pekerjaan</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {detail.deskripsi_kerja}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-4">Keahlian yang Dibutuhkan</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {detail.skill_kerja.split(',').map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        Pilih Lowongan
                                    </h3>
                                    <p className="text-gray-500">
                                        Klik pada salah satu lowongan di sebelah kiri untuk melihat detail lengkapnya
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Home;