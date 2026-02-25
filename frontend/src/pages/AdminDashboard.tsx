import React, { useState } from 'react'
import { uploadProduct, me, logout } from '../api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import Spinner from '../components/Spinner'

export default function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('0.00')
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const nav = useNavigate()

  useEffect(() => {
    me().then((u) => {
      if (!u) nav('/admin/login')
      else setUser(u)
    })
  }, [])

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files
    if (!list) return
    setFiles(Array.from(list))
  }

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    try {
      setUploading(true)
      await uploadProduct({ title, description, price }, files)
      setMessage('Producto creado')
      setTitle('')
      setDescription('')
      setPrice('0.00')
      setFiles([])
      // show toast then redirect to home to refresh gallery
      setTimeout(() => {
        nav('/')
      }, 800)
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Error al subir')
    } finally {
      setUploading(false)
    }
  }

  const [uploading, setUploading] = useState(false)

  async function handleLogout() {
    await logout()
    nav('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <div>{user?.email}</div>
            <button onClick={handleLogout} className="text-sm text-red-600">Cerrar sesión</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <label className="block mb-2">Título</label>
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <label className="block mb-2">Descripción</label>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <label className="block mb-2">Precio</label>
          <input name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-4" />

          <label className="block mb-2">Imágenes (arrastrar o seleccionar múltiples)</label>
          <div
            {...getRootProps()}
            className={`mb-4 p-6 border-2 rounded border-dashed ${isDragActive ? 'border-black bg-white' : 'border-gray-300 bg-gray-50'} text-center cursor-pointer`}
          >
            <input name="files" {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta las imágenes aquí...</p>
            ) : (
              <p>Arrastra y suelta imágenes, o haz click para seleccionar (puedes subir varias)</p>
            )}
          </div>

          <div className="flex gap-3 mb-4 flex-wrap">
            {files.map((f, i) => (
              <div key={i} className="w-28 h-28 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs p-1">
                <img src={URL.createObjectURL(f)} alt={f.name} className="object-cover h-full w-full" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-black text-white px-4 py-2 rounded" disabled={uploading}>{uploading ? <span className="flex items-center gap-2"><Spinner size={16} /> Subiendo...</span> : 'Subir producto'}</button>
          </div>
          {message && <div className="mt-4 text-sm">{message}</div>}
        </form>
        {message && <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow">{message}</div>}
      </div>
    </div>
  )
}
