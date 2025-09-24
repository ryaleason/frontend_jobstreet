import { Search, User, LogOut } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); 
    const { logout ,token} = useContext(AuthContext);
    const [user,setUser] = useState("");

    const handelUser = async ()=>{
        try {
            const response = await axios.get("https://ryal-jobstreet.rakarawr.com//api/user/profile",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        setUser(response.data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        handelUser()
    },[])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.dropdown-user')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Search Section */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">J</span>
                            </div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                                JobStreet
                            </h1>
                        </div>

                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Cari lowongan impian Anda..."
                                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 relative">
                        <ul className="hidden lg:flex items-center gap-6">
                            <a href='/' className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200 font-medium">
                                Home
                            </a>
                            <a href='/lowongan' className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200 font-medium">
                                Jelajahi Lowongan
                            </a>
                            <a href='/perusahaan' className="text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200 font-medium">
                                Perusahaan
                            </a>
                        </ul>

                        {user ? (
                            <div className="relative dropdown-user">
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full cursor-pointer"
                                >
                                    <User className="w-5 h-5 text-blue-600" />
                                    <span className="text-gray-800 font-medium">{user?.nama}</span>
                                </div>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-200">
                                        {user.role === "Perusahaan" ? (
                                            <a
                                            href="/dashboard/perusahaan"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                        >
                                            Dashboard
                                        </a>
                                        ): (
                                            <a
                                            href="/user/profile"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                        >
                                            Profil Saya
                                        </a>
                                        )}
                                        

                                        <a
                                            href="/user/lamaran"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                                        >
                                            Lamaran Saya
                                        </a>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-lg flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a
                                href="/login"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Login
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
