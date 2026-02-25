import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Accept': 'application/json' },
})

export async function getProducts() {
  const res = await api.get('/products')
  return res.data
}

export async function login(email: string, password: string) {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

export async function me() {
  const res = await api.get('/auth/me')
  return res.data
}

export async function logout() {
  const res = await api.post('/auth/logout')
  return res.data
}

export async function uploadProduct(fields: { title: string; description?: string; price: string }, files: File[]) {
  const fd = new FormData()
  fd.append('title', fields.title)
  if (fields.description) fd.append('description', fields.description)
  fd.append('price', fields.price)
  files.forEach((f) => fd.append('files', f))
  const res = await api.post('/admin/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data
}

export default api
