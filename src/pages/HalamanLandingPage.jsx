import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Users, TrendingUp, Star, ChevronRight, Play, Award, Shield, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const JobStreetLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Temukan Karir Impian Anda",
      subtitle: "Ribuan lowongan kerja dari perusahaan terpercaya menunggu Anda",
      image: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Perusahaan Top Mencari Talenta",
      subtitle: "Bergabunglah dengan perusahaan terkemuka di Indonesia",
      image: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Raih Kesuksesan Bersama Kami",
      subtitle: "Platform terpercaya untuk mencari pekerjaan dan talent",
      image: "bg-gradient-to-r from-teal-500 to-teal-600"
    }
  ];

  const featuredJobs = [
    { title: "Senior Software Engineer", company: "TechCorp", location: "Jakarta", salary: "Rp 15-20 juta", type: "Full-time" },
    { title: "Marketing Manager", company: "Creative Agency", location: "Bandung", salary: "Rp 10-15 juta", type: "Full-time" },
    { title: "Data Analyst", company: "FinTech Plus", location: "Surabaya", salary: "Rp 8-12 juta", type: "Remote" },
    { title: "UI/UX Designer", company: "Design Studio", location: "Yogyakarta", salary: "Rp 7-10 juta", type: "Hybrid" }
  ];

  const topCompanies = [
    { name: "TechCorp", jobs: "150+ Jobs", logo: "TC" },
    { name: "FinanceHub", jobs: "89+ Jobs", logo: "FH" },
    { name: "Creative Agency", jobs: "67+ Jobs", logo: "CA" },
    { name: "StartupXYZ", jobs: "45+ Jobs", logo: "SX" }
  ];

  const categories = [
    { name: "Technology", count: "2,500+ jobs", icon: "💻" },
    { name: "Marketing", count: "1,800+ jobs", icon: "📈" },
    { name: "Finance", count: "1,200+ jobs", icon: "💰" },
    { name: "Healthcare", count: "900+ jobs", icon: "🏥" },
    { name: "Education", count: "700+ jobs", icon: "📚" },
    { name: "Design", count: "600+ jobs", icon: "🎨" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>

      <section className="relative overflow-hidden">
        <div className={`${heroSlides[currentSlide].image} transition-all duration-1000 ease-in-out`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-12 opacity-90">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Posisi, skill, atau perusahaan"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Lokasi"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      Cari
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {['Software Engineer', 'Marketing', 'Data Analyst', 'Designer'].map((tag, index) => (
                    <button key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Lowongan Aktif', icon: Briefcase },
              { number: '5,000+', label: 'Perusahaan Partner', icon: Users },
              { number: '50,000+', label: 'Pencari Kerja', icon: TrendingUp },
              { number: '98%', label: 'Tingkat Kepuasan', icon: Star }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Lowongan Terbaru</h2>
            <p className="text-xl text-gray-600">Peluang karir terbaik menanti Anda</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.type === 'Remote' ? 'bg-green-100 text-green-600' :
                      job.type === 'Hybrid' ? 'bg-purple-100 text-purple-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="text-lg font-bold text-blue-600 mb-4">{job.salary}</div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Lamar Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors inline-flex items-center">
              Lihat Semua Lowongan
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Jelajahi Kategori</h2>
            <p className="text-xl text-gray-600">Temukan pekerjaan sesuai minat Anda</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Perusahaan Teratas</h2>
            <p className="text-xl text-gray-600">Bergabunglah dengan perusahaan terpercaya</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">{company.logo}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{company.name}</h3>
                <p className="text-blue-600 font-medium">{company.jobs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih JobStreet?</h2>
            <p className="text-xl opacity-90">Platform pencarian kerja terdepan di Indonesia</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Terpercaya & Aman',
                description: 'Platform yang telah dipercaya jutaan pencari kerja dan perusahaan'
              },
              {
                icon: Clock,
                title: 'Proses Cepat',
                description: 'Sistem matching yang cerdas untuk menghubungkan Anda dengan pekerjaan yang tepat'
              },
              {
                icon: Award,
                title: 'Kualitas Terjamin',
                description: 'Semua lowongan telah diverifikasi untuk memastikan kualitas dan keamanan'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Siap Memulai Karir Impian?</h2>
          <p className="text-xl mb-8 opacity-90">Bergabunglah dengan ribuan profesional yang telah menemukan pekerjaan impian mereka</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg transform hover:scale-105">
              Mulai Cari Kerja
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors text-lg transform hover:scale-105">
              Daftar Perusahaan
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">JobStreet</h3>
              <p className="text-gray-400">Platform pencarian kerja terpercaya di Indonesia</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Pencari Kerja</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Cari Lowongan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tips Karir</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Buat CV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Pasang Lowongan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cari Talenta</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Solusi HR</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tentang</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JobStreet. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobStreetLandingPage;