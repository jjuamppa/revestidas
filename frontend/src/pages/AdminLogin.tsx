import React, { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  async function handle(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
      nav('/admin/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handle}>
          <label className="block mb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <label className="block mb-2">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded mb-4" />
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button disabled={loading} className="w-full bg-black text-white p-2 rounded">{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}
