# Clínica Dental - Sistema de Gestión

Este proyecto es un sistema completo de gestión para una clínica dental, desarrollado con React/TypeScript en el frontend y Django Rest Framework en el backend, todo containerizado con Docker.

## 📋 Estructura del Proyecto

```
dental-clinic/
├── Frontend/                 # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/      # Componentes de React
│   │   ├── services/        # Servicios para API
│   │   └── hooks/          # Custom hooks
│   └── package.json
├── docker/                  # Configuración Docker
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   ├── Dockerfile.nginx
│   └── nginx.conf
├── docker-compose.yml       # Configuración de servicios
└── .env.development        # Variables de entorno
```

## 🚀 Configuración Inicial

### Prerrequisitos

1. **Docker Desktop** instalado y en ejecución
2. **Git** para clonar repositorios
3. **Node.js** (opcional, para desarrollo local)
4. **Python 3.9+** (opcional, para desarrollo local)

### Instalación

1. **Clonar el repositorio principal:**
   ```bash
   git clone <tu-repo-principal>
   cd dental-clinic
   ```

2. **El backend ya está clonado en la carpeta `Dental-Clinic-Backend`**

3. **Iniciar los servicios con Docker:**
   ```bash
   docker-compose up --build
   ```

## 🌐 URLs de Acceso

Una vez iniciados los servicios:

- **Frontend (React):** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Admin Django:** http://localhost:8000/admin
- **Nginx (Proxy):** http://localhost:80

## 📡 Endpoints del Backend

### Dentistas
- `GET /agenda/api/dentistas/` - Listar dentistas
- `POST /agenda/api/dentistas/` - Crear dentista
- `GET /agenda/api/dentistas/{id}/` - Obtener dentista
- `PUT/PATCH /agenda/api/dentistas/{id}/` - Actualizar dentista
- `DELETE /agenda/api/dentistas/{id}/` - Eliminar dentista

### Servicios
- `GET /agenda/api/servicios/` - Listar servicios
- `POST /agenda/api/servicios/` - Crear servicio

### Pacientes
- `GET /agenda/api/pacientes/` - Listar pacientes
- `POST /agenda/api/pacientes/` - Crear paciente

### Agenda
- `GET /agenda/slots/` - Obtener slots disponibles
- `GET /agenda/slots_por_fecha/` - Slots por fecha específica
- `POST /agenda/reservas/` - Crear nueva reserva
- `POST /agenda/dentistas/{id}/generar_slots/` - Generar slots para un dentista

## 🔧 Desarrollo

### Frontend

El frontend está configurado para conectarse automáticamente al backend usando:

```typescript
// services/apiClient.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

### Servicios Disponibles

Los servicios están listos para conectar con el backend Django:

```typescript
import { 
  dentistaService, 
  servicioService, 
  pacienteService, 
  agendaService 
} from './services/dentalClinicService';

// Ejemplos de uso
const dentistas = await dentistaService.getAll();
const slots = await agendaService.getSlots({ dentista: 1, fecha: '2025-10-03' });
const nuevaReserva = await agendaService.crearReserva(reservaData);
```

## 🐳 Comandos Docker Útiles

```bash
# Construir e iniciar servicios
docker-compose up --build

# Iniciar en segundo plano
docker-compose up -d

# Ver logs de un servicio específico
docker-compose logs frontend
docker-compose logs backend

# Parar servicios
docker-compose down

# Reconstruir un servicio específico
docker-compose build frontend
docker-compose up frontend

# Acceder al contenedor del backend
docker-compose exec backend bash

# Ver estado de los servicios
docker-compose ps
```

## 🔍 Solución de Problemas

### El backend no se conecta

1. Verificar que Docker Desktop esté ejecutándose
2. Revisar logs: `docker-compose logs backend`
3. Verificar que el puerto 8000 no esté en uso

### El frontend no encuentra el backend

1. Verificar variables de entorno en `.env.development`
2. Asegurarse de que `REACT_APP_API_URL=http://localhost:8000`
3. Revisar logs: `docker-compose logs frontend`

### Problemas con CORS

El backend está configurado para aceptar solicitudes desde:
- http://localhost:3000
- http://127.0.0.1:3000
- http://frontend:3000

### Base de datos

El backend usa SQLite por defecto. La base de datos se encuentra en:
```
Dental-Clinic-Backend/db.sqlite3
```

## 📦 Próximos Pasos

Una vez que tengas la conexión funcionando correctamente:

1. **Migrar el backend:** Crear tu propio repositorio para el backend
2. **Eliminar carpeta temporal:** Eliminar `Dental-Clinic-Backend/`
3. **Actualizar configuración:** Apuntar a tu nuevo repositorio
4. **Personalizar:** Adaptar según tus necesidades específicas

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servicios
docker-compose up --build

# Iniciar en segundo plano
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f
```

## 🛠️ Variables de Entorno

### Frontend (.env.development)
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Backend (configurado en docker-compose.yml)
```env
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,backend
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## 📝 Notas Importantes

- **No modificar** archivos en `Dental-Clinic-Backend/` ya que es temporal
- Usar siempre Docker para desarrollo para evitar problemas de compatibilidad
- Las migraciones de Django se ejecutan automáticamente al iniciar el contenedor
- El hot-reload está habilitado tanto para React como para Django

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request