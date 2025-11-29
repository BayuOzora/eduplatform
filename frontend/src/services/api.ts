import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseService = {
  getAll: () => api.get('courses/'),
  get: (id: number) => api.get(`courses/${id}/`),
  create: (data: any) => api.post('courses/', data),
  update: (id: number, data: any) => api.put(`courses/${id}/`, data),
  delete: (id: number) => api.delete(`courses/${id}/`),
};

export const userService = {
  getTeachers: () => api.get('users/?role=teacher'),
};

export default api;