import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2'
import { 
    Building2, 
    MapPin, 
    Clock, 
    User, 
    Phone, 
    Users, 
    Home, 
    FileText, 
    Upload, 
    Send, 
    Briefcase,
    Calendar,
    Star,
    CheckCircle,
    AlertCircle,
    ArrowRight
} from 'lucide-react';

const HalamanLamaran = () => {
    const { user, token } = useContext(AuthContext);
    const { id } = useParams();
    const [dataPerusahaan, setdataPerusahaan] = useState(null);
    const [dataLowongan, setDataLowongan] = useState([""]);
    const [dataUser, setDataUser] = useState("");
    const [alasan, setAlasan] = useState("");
    const [cv, setCv] = useState(null);
    const [loading, setLoading] = useState(false);

    const formData = new FormData();
    formData.append("id_user", user.id);
    formData.append("id_lowongan", id);
    formData.append("alasan", alasan);
    formData.append("cv", cv);

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("https://ryal-jobstreet.rakarawr.com/api/user/lamaran", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                confirmButtonColor: '#3b82f6',
            });

            window.location.reload();

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || "Terjadi kesalahan",
                confirmButtonColor: '#ef4444',
            });
        } finally {
            setLoading(false);
        }
    }

    const handeluser = async () => {
        const response = await axios.get('https://ryal-jobstreet.rakarawr.com/api/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDataUser(response.data);
    }

    useEffect(() => {
        handeluser()
    }, [])

    useEffect(() => {
        const handel = async () => {
            try {
                const response = await axios.get(`https://ryal-jobstreet.rakarawr.com/api/user/lowongan/${id}`);
                setdataPerusahaan(response?.data);
            } catch (error) {
                console.error("Gagal fetch data:", error);
            }
        };
        handel();
    }, []);

    useEffect(() => {
        const handelLowongan = async () => {
            try {
                const response = await axios.get(`https://ryal-jobstreet.rakarawr.com/api/user/lowongan`);
                setDataLowongan(response?.data);
            } catch (error) {
                console.error("Gagal fetch data:", error);
            }
        };
        handelLowongan();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full'>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                            <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4'>
                                <p className='text-blue-100 text-sm font-medium flex items-center gap-2'>
                                    <Briefcase className="w-4 h-4" />
                                    Melamar Kerja di
                                </p>
                            </div>
                            
                            <div className='p-6'>
                                <div className='flex flex-col md:flex-row items-start gap-6'>
                                    <div className='flex-1 space-y-4'>
                                        <div>
                                            <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                                                <Building2 className="w-6 h-6 text-blue-500" />
                                                {dataPerusahaan?.perusahaan.nama}
                                            </h1>
                                        </div>
                                        
                                        <div className='space-y-3'>
                                            <div className='flex items-center gap-3 p-3 bg-blue-50 rounded-lg'>
                                                <Star className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <span className='text-sm text-gray-600'>Posisi:</span>
                                                    <p className='font-semibold text-gray-800'>{dataPerusahaan?.nama_kerja}</p>
                                                </div>
                                            </div>
                                            
                                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                                <MapPin className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <span className='text-sm text-gray-600'>Lokasi:</span>
                                                    <p className='font-semibold text-gray-800'>{dataPerusahaan?.lokasi}</p>
                                                </div>
                                            </div>
                                            
                                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                                <Clock className="w-5 h-5 text-blue-500" />
                                                <div>
                                                    <span className='text-sm text-gray-600'>Jam Kerja:</span>
                                                    <p className='font-semibold text-gray-800'>{dataPerusahaan?.jam_kerja}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='flex-shrink-0'>
                                        <div className='w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-lg border-4 border-blue-100 overflow-hidden'>
                                            <img 
                                                className='w-full h-full object-cover' 
                                                src={`https://ryal-jobstreet.rakarawr.com/storage/${dataPerusahaan?.perusahaan.logo}`} 
                                                alt="Company Logo"
                                                
                                            />
                                            {/* <div className="w-full h-full bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl" style={{display: 'none'}}>
                                                {dataPerusahaan?.perusahaan?.nama?.charAt(0) || 'C'}
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                            <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4'>
                                <h1 className='text-xl font-bold text-white flex items-center gap-2'>
                                    <FileText className="w-5 h-5" />
                                    Form Lamaran
                                </h1>
                            </div>
                            
                            <div className='p-6'>
                                <form onSubmit={handelSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                                <User className="w-4 h-4 text-blue-500" />
                                                Nama Lengkap
                                            </label>
                                            <input 
                                                value={dataUser?.nama || ''} 
                                                disabled 
                                                type="text" 
                                                className='w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                                <Phone className="w-4 h-4 text-blue-500" />
                                                No Telepon
                                            </label>
                                            <input 
                                                type="text" 
                                                value={dataUser?.nomor || ''} 
                                                disabled 
                                                className='w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                                <Users className="w-4 h-4 text-blue-500" />
                                                Jenis Kelamin
                                            </label>
                                            <input 
                                                type="text" 
                                                value={dataUser?.jenis_kelamin || ''} 
                                                disabled 
                                                className='w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                                <Home className="w-4 h-4 text-blue-500" />
                                                Domisili
                                            </label>
                                            <input 
                                                type="text" 
                                                disabled 
                                                value={dataUser?.domisili || ''} 
                                                className='w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                            <FileText className="w-4 h-4 text-blue-500" />
                                            Alasan Melamar *
                                        </label>
                                        <textarea 
                                            value={alasan} 
                                            onChange={(e) => setAlasan(e.target.value)} 
                                            rows={4}
                                            placeholder="Jelaskan alasan Anda tertarik dengan posisi ini..."
                                            className='w-full resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                            <Upload className="w-4 h-4 text-blue-500" />
                                            Upload CV *
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type='file' 
                                                onChange={(e) => setCv(e.target.files[0])} 
                                                className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' 
                                                accept=".pdf,.doc,.docx"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Format yang didukung: PDF, DOC, DOCX (Max: 5MB)</p>
                                    </div>

                                    <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
                                        <div className='flex items-start gap-3'>
                                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className='text-sm text-amber-700'>
                                                    Pastikan data diri Anda sudah lengkap sebelum melamar.
                                                    <a href='/user/profile' className='text-blue-500 hover:text-blue-600 font-semibold ml-1 inline-flex items-center gap-1'>
                                                        Lengkapi profil <ArrowRight className="w-3 h-3" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                    Mengirim...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Kirim Lamaran
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24'>
                            <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4'>
                                <h1 className='text-lg font-bold text-white flex items-center gap-2'>
                                    <Briefcase className="w-5 h-5" />
                                    Lowongan Lainnya
                                </h1>
                                <p className='text-blue-100 text-sm'>Dari perusahaan yang sama</p>
                            </div>
                            
                            <div className='p-4 max-h-96 overflow-y-auto'>
                                {dataLowongan?.length > 0 ? (
                                    <div className='space-y-4'>
                                        {dataLowongan.map((item, id) => (
                                            <div key={id} className='bg-gray-50 hover:bg-blue-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-all duration-200 cursor-pointer group'>
                                                <div className='space-y-2'>
                                                    <h3 className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2'>
                                                        {item.nama_kerja}
                                                    </h3>
                                                    
                                                    <p className='text-sm text-gray-600 line-clamp-2'>
                                                        {item.deskripsi_kerja}
                                                    </p>
                                                    
                                                    <div className='space-y-1'>
                                                        <div className='flex items-center gap-2 text-xs text-gray-500'>
                                                            <MapPin className="w-3 h-3" />
                                                            {item.lokasi}
                                                        </div>
                                                        
                                                        <div className='flex items-center gap-2 text-xs text-gray-500'>
                                                            <Clock className="w-3 h-3" />
                                                            {item.jam_kerja}
                                                        </div>
                                                        
                                                        <div className='flex items-center gap-2 text-xs text-gray-500'>
                                                            <Calendar className="w-3 h-3" />
                                                            Deadline: {item.waktu_tenggang}
                                                        </div>
                                                    </div>
                                                    
                                                    {item.skill_kerja && (
                                                        <div className='flex flex-wrap gap-1 mt-2'>
                                                            {item.skill_kerja.split(',').slice(0, 3).map((skill, index) => (
                                                                <span key={index} className='bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full'>
                                                                    {skill.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-8'>
                                        <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className='text-gray-500 text-sm'>Tidak ada lowongan lain tersedia</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HalamanLamaran;