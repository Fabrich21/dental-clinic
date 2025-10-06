import apiClient from './apiClient';

// Interfaces para los tipos de datos
export interface Dentista {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono?: string;
  email?: string;
  region?: Region;
  region_id?: number;
}

export interface Servicio {
  id: number;
  nombre: string;
  duracion: number;
  precio: number;
  descripcion?: string;
}

export interface Paciente {
  id: number;
  rut: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  fecha_registro?: string;
}

export interface SlotAgenda {
  id: number;
  dentista: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  disponible: boolean;
  servicio?: number;
  paciente?: number;
}

export interface Region {
  id: number;
  nombre: string;
  codigo: string;
}

export interface Reserva {
  dentista: number;
  servicio: number;
  paciente: number;
  fecha: string;
  hora_inicio: string;
  observaciones?: string;
}

// Servicios para Dentistas
export const dentistaService = {
  getAll: () => apiClient.get('/agenda/api/dentistas/'),
  getById: (id: number) => apiClient.get(`/agenda/api/dentistas/${id}/`),
  create: (data: Omit<Dentista, 'id'>) => apiClient.post('/agenda/api/dentistas/', data),
  update: (id: number, data: Partial<Dentista>) => apiClient.patch(`/agenda/api/dentistas/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/agenda/api/dentistas/${id}/`),
};

// Servicios para Servicios
export const servicioService = {
  getAll: () => apiClient.get('/agenda/api/servicios/'),
  getById: (id: number) => apiClient.get(`/agenda/api/servicios/${id}/`),
  create: (data: Omit<Servicio, 'id'>) => apiClient.post('/agenda/api/servicios/', data),
  update: (id: number, data: Partial<Servicio>) => apiClient.patch(`/agenda/api/servicios/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/agenda/api/servicios/${id}/`),
};

// Servicios para Pacientes
export const pacienteService = {
  getAll: () => apiClient.get('/agenda/api/pacientes/'),
  getById: (id: number) => apiClient.get(`/agenda/api/pacientes/${id}/`),
  create: (data: Omit<Paciente, 'id'>) => apiClient.post('/agenda/api/pacientes/', data),
  update: (id: number, data: Partial<Paciente>) => apiClient.patch(`/agenda/api/pacientes/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/agenda/api/pacientes/${id}/`),
};

// Servicios para Agenda y Slots
export const agendaService = {
  getSlots: (params?: { dentista?: number; fecha?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.dentista) queryParams.append('dentista', params.dentista.toString());
    if (params?.fecha) queryParams.append('fecha', params.fecha);
    const queryString = queryParams.toString();
    return apiClient.get(`/agenda/slots/${queryString ? `?${queryString}` : ''}`);
  },
  
  getSlotsPorFecha: (fecha: string, dentista?: number) => {
    const queryParams = new URLSearchParams({ fecha });
    if (dentista) queryParams.append('dentista', dentista.toString());
    return apiClient.get(`/agenda/slots_por_fecha/?${queryParams.toString()}`);
  },
  
  crearReserva: (data: Reserva) => 
    apiClient.post('/agenda/api/reservas/', data),
  
  generarSlots: (dentistaId: number, fecha: string) =>
    apiClient.post(`/agenda/dentistas/${dentistaId}/generar_slots/`, { fecha }),
    
  // Obtener reservas por dentista y fecha para determinar horarios ocupados
  getReservasByDentistaAndDate: (dentistaId: number, fecha: string) =>
    apiClient.get(`/agenda/api/reservas/?dentista=${dentistaId}&fecha=${fecha}`),
    
  // Obtener todas las reservas de una fecha específica
  getReservasByDate: (fecha: string) =>
    apiClient.get(`/agenda/api/reservas/?fecha=${fecha}`),
};

// Servicios para Regiones
export const regionService = {
  getAll: () => apiClient.get('/agenda/api/regiones/'),
  getById: (id: number) => apiClient.get(`/agenda/api/regiones/${id}/`),
  create: (data: Omit<Region, 'id'>) => apiClient.post('/agenda/api/regiones/', data),
  update: (id: number, data: Partial<Region>) => apiClient.patch(`/agenda/api/regiones/${id}/`, data),
  delete: (id: number) => apiClient.delete(`/agenda/api/regiones/${id}/`),
};

// Exportar servicios individuales para fácil importación
export { apiClient };