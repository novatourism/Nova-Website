// nova-tourism/src/services/api.ts
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nova_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ─── Packages ───────────────────────────────────────────────
export const getPackages = () => api.get('/packages')
export const getPackage = (id: number) => api.get(`/packages/${id}`)
export const createPackage = (data: FormData) =>
  api.post('/packages', data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updatePackage = (id: number, data: FormData) =>
  api.put(`/packages/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deletePackage = (id: number) => api.delete(`/packages/${id}`)

// ─── Gallery ────────────────────────────────────────────────
export const getGallery = () => api.get('/gallery')
export const uploadGalleryImage = (data: FormData) =>
  api.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteGalleryImage = (id: number) => api.delete(`/gallery/${id}`)

// ─── Enquiries ──────────────────────────────────────────────
export const submitEnquiry = (data: object) => api.post('/enquiries', data)
export const getEnquiries = () => api.get('/enquiries')
export const markEnquiryRead = (id: number) => api.patch(`/enquiries/${id}/read`)
export const deleteEnquiry = (id: number) => api.delete(`/enquiries/${id}`)

// ─── Auth ───────────────────────────────────────────────────
export const adminLogin = (data: { username: string; password: string }) =>
  api.post('/auth/login', data)