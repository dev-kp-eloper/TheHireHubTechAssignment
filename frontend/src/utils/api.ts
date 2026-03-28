import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job API calls
export const jobAPI = {
  getAll: () => api.get('/jobs'),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
};

// Candidate API calls
export const candidateAPI = {
  getAll: (params?: any) => api.get('/candidates', { params }),
  getByJob: (jobId: string, params?: any) => 
    api.get(`/candidates/job/${jobId}`, { params }),
  getById: (id: string) => api.get(`/candidates/${id}`),
  create: (data: any) => api.post('/candidates', data),
  update: (id: string, data: any) => api.put(`/candidates/${id}`, data),
  updateStage: (id: string, stage: string) => 
    api.patch(`/candidates/${id}/stage`, { stage }),
  addNote: (id: string, note: string) => 
    api.post(`/candidates/${id}/notes`, { note }),
  delete: (id: string) => api.delete(`/candidates/${id}`),
  getByStage: (jobId: string) => api.get(`/candidates/job/${jobId}/stages`),
  getStats: (jobId: string) => api.get(`/candidates/job/${jobId}/stats`),
};

export default api;
