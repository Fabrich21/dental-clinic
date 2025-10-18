import React, { useState, useEffect } from 'react';
import { adminAPI, DashboardStats } from '../../services/adminAPI';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Loader2,
  CalendarDays,
  Stethoscope
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError('Error al cargar las estadísticas');
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu actividad como dentista</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Citas Hoy"
            value={stats.citas_hoy}
            icon={Calendar}
            color="bg-blue-500"
            subtitle="Citas programadas para hoy"
          />
          <StatCard
            title="Citas esta Semana"
            value={stats.citas_semana}
            icon={CalendarDays}
            color="bg-green-500"
            subtitle="Total de la semana"
          />
          <StatCard
            title="Citas este Mes"
            value={stats.citas_mes}
            icon={TrendingUp}
            color="bg-purple-500"
            subtitle="Total del mes actual"
          />
          <StatCard
            title="Pacientes Atendidos"
            value={stats.pacientes_atendidos_mes}
            icon={Users}
            color="bg-orange-500"
            subtitle="Únicos este mes"
          />
        </div>
      )}

      {/* Próximas Citas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
            Próximas Citas
          </h2>
        </div>
        
        <div className="p-6">
          {stats?.proximas_citas && stats.proximas_citas.length > 0 ? (
            <div className="space-y-4">
              {stats.proximas_citas.map((cita, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {cita.servicio?.nombre || 'Consulta'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(cita.fecha).toLocaleDateString('es-ES')} a las {cita.hora}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {cita.reservas_count}/{cita.capacidad} reservas
                    </p>
                    <p className={`text-xs ${
                      cita.disponible ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cita.disponible ? 'Disponible' : 'Completo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay citas programadas para los próximos días</p>
            </div>
          )}
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group">
              <Calendar className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                Crear Nueva Cita
              </p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group">
              <Stethoscope className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                Ver Agenda
              </p>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group">
              <Clock className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                Configurar Horarios
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};