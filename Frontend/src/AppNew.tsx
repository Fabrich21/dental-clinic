import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public booking components
import { BookingApp } from './components/BookingApp';

// Admin components
import { LoginPage } from './components/admin/LoginPage';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardPage } from './components/admin/DashboardPage';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta principal - aplicación de reservas */}
          <Route path="/" element={<BookingApp />} />
          
          {/* Rutas del panel de administración */}
          <Route path="/admin/login" element={<LoginPage />} />
          
          {/* Rutas protegidas del admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="agenda" element={<div className="p-6 bg-white rounded-lg shadow">Agenda - En desarrollo</div>} />
            <Route path="reservas" element={<div className="p-6 bg-white rounded-lg shadow">Reservas - En desarrollo</div>} />
            <Route path="vacaciones" element={<div className="p-6 bg-white rounded-lg shadow">Vacaciones - En desarrollo</div>} />
            <Route path="horarios" element={<div className="p-6 bg-white rounded-lg shadow">Horarios - En desarrollo</div>} />
            <Route path="configuracion" element={<div className="p-6 bg-white rounded-lg shadow">Configuración - En desarrollo</div>} />
          </Route>

          {/* Catch all - redirigir a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;