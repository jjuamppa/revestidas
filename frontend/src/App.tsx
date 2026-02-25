import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}
