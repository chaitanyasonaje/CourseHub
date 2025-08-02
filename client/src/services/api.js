import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Course API methods
export const courseAPI = {
  // Get all courses
  getAll: async () => {
    const response = await api.get('/courses');
    return response.data;
  },

  // Get single course
  getById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
};

// Enrollment API methods
export const enrollmentAPI = {
  // Get current student's enrollments
  getMyEnrollments: async () => {
    const response = await api.get('/enrollments/me');
    return response.data;
  },

  // Enroll in a course
  enroll: async (courseId) => {
    const response = await api.post('/enrollments', { courseId });
    return response.data;
  },

  // Unenroll from a course
  unenroll: async (courseId) => {
    const response = await api.delete(`/enrollments/${courseId}`);
    return response.data;
  },

  // Get enrollment status for a course
  getStatus: async (courseId) => {
    const response = await api.get(`/enrollments/status/${courseId}`);
    return response.data;
  },

  // Update enrollment progress
  updateProgress: async (courseId, progress) => {
    const response = await api.put(`/enrollments/${courseId}/progress`, { progress });
    return response.data;
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 