# Dental Clinic Management System

Sistema de gestión para clínica dental desarrollado con React/TypeScript (frontend) y Django REST Framework (backend).

## Project Structure

```
dental-clinic/
├── Frontend/              # React + TypeScript application
├── Dental-Clinic-Backend/ # Django REST API
```

## Prerequisites

- Docker Desktop
- Git
- Node.js 18+ (for local development)
- Python 3.9+ (for local development)

## Installation

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd Dental-Clinic-Backend
docker-compose up --build
```

## Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Django Admin:** http://localhost:8000/admin

## API Endpoints

Base URL: `http://localhost:8000`

### Core Resources
- `/agenda/api/dentistas/` - Dentist management
- `/agenda/api/servicios/` - Services management  
- `/agenda/api/pacientes/` - Patient management
- `/agenda/api/reservas/` - Appointment management

### Scheduling
- `/agenda/slots/` - Available time slots
- `/agenda/slots_por_fecha/` - Slots by date
- `/agenda/bulk/pacientes/` - Bulk patient creation
- `/agenda/status/` - System status

## Development

### Environment Configuration

Frontend connects to backend via environment variables:
```
REACT_APP_API_URL=http://localhost:8000
```

### Key Features

- Automatic data persistence via Django migrations
- Bulk data import from external systems
- Duplicate RUT handling for patient records
- Real-time appointment scheduling

# Iniciar en segundo plano
docker-compose up -d

## Docker Commands

```bash
# Start services
docker-compose up --build

# Stop services  
docker-compose down

# View logs
docker-compose logs backend
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request