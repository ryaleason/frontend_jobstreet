import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const HalamanPerusahaan = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handel = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://ryal-jobstreet.rakarawr.com/api/user/perusahaan");
            setData(response.data);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Terjadi kesalahan saat memuat data",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handel();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center min-h-[80vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-50">
            <Navbar />
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
                <div className="container mt-[13vh] mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Perusahaan Terpercaya</h1>
                        <p className="text-xl opacity-90">Temukan perusahaan impian Anda dan mulai karir yang cemerlang</p>
                        <div className="mt-6">
                            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                                {data.length} Perusahaan Tersedia
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {data.map((item, id) => (
                        <div key={id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
                                <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
                                    {item?.logo ? (
                                        <img 
                                            src={`https://ryal-jobstreet.rakarawr.com/storage/${item.logo}`} 
                                            alt={`${item.nama} logo`}
                                            className="w-16 h-16 object-cover rounded-full"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {item?.nama?.charAt(0) || 'P'}
                                        </div>
                                    )}
                                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{display: 'none'}}>
                                        {item?.nama?.charAt(0) || 'P'}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                                        {item?.nama}
                                    </h2>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                            {item?.kategori}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            Sejak {item?.tahun}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                    {item?.deskripsi}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-blue-500">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zM9 5a1 1 0 011-1h0a1 1 0 011 1v1H9V5z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-medium">
                                                {item?.lowongans_count} Lowongan
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Perusahaan</h3>
                        <p className="text-gray-500">Data perusahaan akan tampil di sini</p>
                    </div>
                )}
            </div>

            
        </div>
    )
}

export default HalamanPerusahaan