import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'


const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    nama: "",
    role: "Pelamar"
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://ryal-jobstreet.rakarawr.com/api/auth/register", form)
       Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: response.data.message,
      confirmButtonColor: '#2563eb'
    })
    } catch (error) {
       Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response?.data?.message || "Register gagal",
      confirmButtonColor: '#dc2626'
    })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Daftar Akun
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Pelamar">Pelamar</option>
            <option value="Perusahaan">Perusahaan</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Sudah punya akun?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login disini
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
