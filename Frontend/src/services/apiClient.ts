// Configuración base para las llamadas al API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Configuración por defecto para fetch
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Función helper para manejar respuestas
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.text();
    console.error('API Error:', errorData);
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

// Cliente API usando fetch nativo
const apiClient = {
  get: async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      method: 'GET',
    });
    const data = await handleResponse(response);
    return { data };
  },

  post: async (endpoint: string, data?: unknown, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    const responseData = await handleResponse(response);
    return { data: responseData };
  },

  patch: async (endpoint: string, data?: unknown, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    const responseData = await handleResponse(response);
    return { data: responseData };
  },

  delete: async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
      method: 'DELETE',
    });
    const responseData = await handleResponse(response);
    return { data: responseData };
  },
};

export default apiClient;