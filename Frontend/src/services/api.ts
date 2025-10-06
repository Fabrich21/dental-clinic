import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios de Pacientes
export const patientService = {
  // Buscar paciente por RUT
  getByRut: (rut: string) => api.get(`/patients/search/${rut}/`),
  
  // Crear nuevo paciente
  create: (patientData: {
    rut: string;
    document_type: string;
    phone?: string;
    email?: string;
  }) => api.post('/patients/', patientData),
  
  // Obtener todos los pacientes
  getAll: () => api.get('/patients/'),
};

// Servicios de Doctores
export const doctorService = {
  // Obtener todos los doctores activos
  getAll: () => api.get('/doctors/'),
  
  // Obtener doctor por ID
  getById: (id: number) => api.get(`/doctors/${id}/`),
  
  // Obtener especialidades
  getSpecialties: () => api.get('/specialties/'),
};

// Servicios de Citas
export const appointmentService = {
  // Crear nueva cita
  create: (appointmentData: {
    patient: number;
    doctor: number;
    service: number;
    region: number;
    appointment_date: string;
    appointment_time: string;
    contact_phone: string;
    contact_email: string;
    notes?: string;
  }) => api.post('/appointments/', appointmentData),
  
  // Obtener citas (con filtros opcionales)
  getAll: (params?: {
    patient_rut?: string;
    doctor_id?: number;
  }) => api.get('/appointments/', { params }),
  
  // Obtener cita por ID
  getById: (id: number) => api.get(`/appointments/${id}/`),
  
  // Actualizar cita
  update: (id: number, data: any) => api.put(`/appointments/${id}/`, data),
  
  // Cancelar cita
  cancel: (id: number) => api.delete(`/appointments/${id}/`),
};

// Servicios de Configuración
export const configService = {
  // Obtener servicios disponibles
  getServices: () => api.get('/services/'),
  
  // Obtener regiones disponibles
  getRegions: () => api.get('/regions/'),
};

// Tipos TypeScript para las respuestas de la API
export interface Patient {
  id: number;
  rut: string;
  document_type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  rut: string;
  specialty: number;
  specialty_name: string;
  license_number: string;
  email: string;
  phone: string;
  is_active: boolean;
  profile_image: string | null;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price: string;
  is_active: boolean;
}

export interface Region {
  id: number;
  name: string;
  code: string;
  is_active: boolean;
}

export interface Appointment {
  id: number;
  patient: number;
  doctor: number;
  service: number;
  region: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  contact_phone: string;
  contact_email: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export default api;