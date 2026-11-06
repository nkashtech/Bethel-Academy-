import axios from 'axios'

// VITE_API_URL points at the API when it's hosted apart from this site. Left empty, it's the same site.
export const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: API_URL, timeout: 20000 })

export const errorText = (err) =>
  err?.response?.data?.error || (err?.code === 'ECONNABORTED' ? 'The request took too long. Please try again.' : 'We could not send this right now. Please try again, or email us.')

export const submit = {
  enquiry: (data) => api.post('/enquiries', data).then((r) => r.data),
  application: (data) => api.post('/applications', data).then((r) => r.data),
  consultation: (data) => api.post('/consultations', data).then((r) => r.data),
}

export const admin = {
  submissions: (key, type) => api.get(`/admin/${type}`, { headers: { Authorization: `Bearer ${key}` } }).then((r) => r.data),
  setStatus: (key, type, id, status) => api.patch(`/admin/${type}/${id}`, { status }, { headers: { Authorization: `Bearer ${key}` } }).then((r) => r.data),
}

export default api
