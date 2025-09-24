import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/HalamanLowongan'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import User from './pages/User/User'



import Lowongan from './pages/Lowongan/Lowongan'
import LowonganCreate from './pages/Lowongan/LowonganCreate'
import LowonganDetail from './pages/Lowongan/LowonganDetail'


import Perusahaan from './pages/Perusahaan/Perusahaan'
import PerusahaanCreate from './pages/Perusahaan/PerusahaanCreate'
import HalamanLandingPage from './pages/HalamanLandingPage'
import LowonganUpdat from './pages/Lowongan/LowonganUpdat'
import Register from './pages/Register'
import PrivateURL from './components/PrivateURL'
import HalamanLamaran from './pages/HalamanLamaran'
import HalamanPerusahaan from './pages/HalamanPerusahaan'
import HalamanLowongan from './pages/HalamanLowongan'





function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<HalamanLandingPage />} />
          <Route path='/lowongan' element={<HalamanLowongan />} />
          <Route path='/perusahaan' element={<HalamanPerusahaan />} />


          <Route element={<PrivateRoute />}>
              <Route path='/user/profile' element={<User />} />

            <Route element={<PrivateURL allowedRoles={["Pelamar"]} />}>
              <Route path='/lamaran/:id' element={<HalamanLamaran />} />

            </Route>
    
            <Route element={<PrivateURL allowedRoles={["Perusahaan"]} />}>
              <Route path='perusahaan/:id/lowongan' element={<Lowongan />} />
              <Route path='perusahaan/:id/lowongan/create' element={<LowonganCreate />} />
              <Route path='perusahaan/lowongan/:id' element={<LowonganDetail />} />
              <Route path='perusahaan/lowongan/:id/edit' element={<LowonganUpdat />} />
              <Route path='dashboard/perusahaan' element={<Perusahaan />} />
              <Route path='/perusahaan/create' element={<PerusahaanCreate />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App