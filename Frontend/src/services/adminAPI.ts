import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

// Configurar axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para incluir token en requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar tokens expirados
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, limpiar storage y redirigir al login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export interface DashboardStats {
  citas_hoy: number;
  citas_semana: number;
  citas_mes: number;
  proximas_citas: Slot[];
  pacientes_atendidos_mes: number;
}

export interface ServicioShort {
  id: number;
  nombre: string;
  duracion_min: number;
  precio: number;
}

export interface ReservaShort {
  id: number;
  paciente: { id: number; nombre: string; apellido: string };
  servicio?: ServicioShort | null;
  sobrecupo?: boolean;
}

export interface Slot {
  id: number;
  servicio?: ServicioShort | null;
  fecha: string;
  hora: string;
  capacidad: number;
  max_overbook: number;
  reservas: ReservaShort[];
  reservas_count: number;
  disponible: boolean;
}

export interface Vacacion {
  id: number;
  dentista: number;
  dentista_nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  motivo: string;
  aprobada: boolean;
  activa: boolean;
  creado_en: string;
}

export interface HorarioTrabajo {
  id: number;
  dentista: number;
  dia_semana: number;
  dia_semana_display: string;
  hora_inicio: string;
  hora_fin: string;
  activo: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  type: 'reserva' | 'vacacion';
  backgroundColor: string;
  borderColor: string;
  extendedProps: Record<string, unknown>;
}

export const adminAPI = {
  // Dashboard
  getDashboardStats: (): Promise<DashboardStats> =>
    api.get('/agenda/auth/dashboard/').then(res => res.data),

  // Agenda
  getAgenda: (fecha?: string): Promise<Slot[]> =>
    api.get(`/agenda/dentista/agenda/${fecha ? `?fecha=${fecha}` : ''}`).then(res => res.data),

  createSlot: (data: {
    servicio: number;
    fecha: string;
    hora: string;
    capacidad: number;
    max_overbook: number;
  }): Promise<Slot> =>
    api.post('/agenda/dentista/slots/crear/', data).then(res => res.data),

  generateSlots: (data: {
    fecha_inicio: string;
    fecha_fin: string;
  }): Promise<{ message: string; slots_creados: number }> =>
    api.post('/agenda/dentista/slots/generar/', data).then(res => res.data),

  // Reservas
  getReservas: (fecha?: string): Promise<ReservaShort[]> =>
    api.get(`/agenda/dentista/reservas/${fecha ? `?fecha=${fecha}` : ''}`).then(res => res.data),

  cancelarReserva: (reservaId: number): Promise<{ message: string }> =>
    api.delete(`/agenda/dentista/reservas/${reservaId}/cancelar/`).then(res => res.data),

  // Vacaciones
  getVacaciones: (): Promise<Vacacion[]> =>
    api.get('/agenda/dentista/vacaciones/').then(res => res.data),

  createVacacion: (data: {
    fecha_inicio: string;
    fecha_fin: string;
    motivo: string;
  }): Promise<Vacacion> =>
    api.post('/agenda/dentista/vacaciones/', data).then(res => res.data),

  updateVacacion: (id: number, data: Partial<Vacacion>): Promise<Vacacion> =>
    api.put(`/agenda/dentista/vacaciones/${id}/`, data).then(res => res.data),

  deleteVacacion: (id: number): Promise<void> =>
    api.delete(`/agenda/dentista/vacaciones/${id}/`).then(res => res.data),

  // Horarios
  getHorarios: (): Promise<HorarioTrabajo[]> =>
    api.get('/agenda/dentista/horarios/').then(res => res.data),

  createHorario: (data: {
    dia_semana: number;
    hora_inicio: string;
    hora_fin: string;
  }): Promise<HorarioTrabajo> =>
    api.post('/agenda/dentista/horarios/', data).then(res => res.data),

  updateHorario: (id: number, data: Partial<HorarioTrabajo>): Promise<HorarioTrabajo> =>
    api.put(`/agenda/dentista/horarios/${id}/`, data).then(res => res.data),

  deleteHorario: (id: number): Promise<void> =>
    api.delete(`/agenda/dentista/horarios/${id}/`).then(res => res.data),

  // Calendario
  getCalendarEvents: (start?: string, end?: string): Promise<CalendarEvent[]> =>
    api.get(`/agenda/dentista/calendar/${start && end ? `?start=${start}&end=${end}` : ''}`).then(res => res.data),

  // Servicios (para formularios)
  getServicios: (): Promise<ServicioShort[]> =>
    api.get('/agenda/api/servicios/').then(res => res.data),
};

export default api;