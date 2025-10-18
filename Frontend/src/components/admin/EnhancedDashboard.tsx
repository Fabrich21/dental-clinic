import React, { useState, useEffect } from 'react';
import { adminAPI, DashboardStats } from '../../services/adminAPI';
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  AlertCircle,
  Loader2,
  CalendarDays,
  Stethoscope,
  Plus,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  subtitle?: string;
  trend?: number;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  trend, 
  trendUp 
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {trend !== undefined && (
          <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${!trendUp ? 'rotate-180' : ''}`} />
            <span>{Math.abs(trend)}% vs mes anterior</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

// Datos de ejemplo para gráficos (esto vendría del backend en producción)
const weeklyData = [
  { name: 'Lun', citas: 12, completadas: 10 },
  { name: 'Mar', citas: 15, completadas: 14 },
  { name: 'Mié', citas: 8, completadas: 8 },
  { name: 'Jue', citas: 20, completadas: 18 },
  { name: 'Vie', citas: 25, completadas: 22 },
  { name: 'Sáb', citas: 6, completadas: 6 },
  { name: 'Dom', citas: 2, completadas: 2 },
];

const monthlyRevenueData = [
  { month: 'Ene', ingresos: 150000 },
  { month: 'Feb', ingresos: 180000 },
  { month: 'Mar', ingresos: 165000 },
  { month: 'Abr', ingresos: 220000 },
  { month: 'May', ingresos: 250000 },
  { month: 'Jun', ingresos: 280000 },
];

const serviceDistribution = [
  { name: 'Limpieza', value: 35, color: '#3B82F6' },
  { name: 'Endodoncia', value: 25, color: '#10B981' },
  { name: 'Ortodoncia', value: 20, color: '#F59E0B' },
  { name: 'Cirugía', value: 15, color: '#EF4444' },
  { name: 'Otros', value: 5, color: '#8B5CF6' },
];

export const EnhancedDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const loadStats = async () => {
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

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Cargando estadísticas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de tu práctica dental</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="year">Este año</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Citas Hoy"
          value={stats?.citas_hoy || 0}
          icon={Calendar}
          color="bg-blue-500"
          subtitle="de 12 programadas"
          trend={15}
          trendUp={true}
        />
        <StatCard
          title="Citas Esta Semana"
          value={stats?.citas_semana || 0}
          icon={CalendarDays}
          color="bg-green-500"
          subtitle="85% completadas"
          trend={8}
          trendUp={true}
        />
        <StatCard
          title="Pacientes Atendidos"
          value={stats?.pacientes_atendidos_mes || 0}
          icon={Users}
          color="bg-purple-500"
          subtitle="este mes"
          trend={3}
          trendUp={false}
        />
        <StatCard
          title="Ingresos del Mes"
          value={280000}
          icon={TrendingUp}
          color="bg-orange-500"
          subtitle="CLP"
          trend={12}
          trendUp={true}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Appointments Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Citas por Día</h3>
            <div className="flex space-x-2">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span>Programadas</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span>Completadas</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="citas" fill="#3B82F6" name="Programadas" />
              <Bar dataKey="completadas" fill="#10B981" name="Completadas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Servicios</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {serviceDistribution.map((service, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded mr-2" 
                  style={{ backgroundColor: service.color }}
                ></div>
                <span className="text-gray-600">{service.name}: {service.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia de Ingresos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value/1000}K`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
              <Area 
                type="monotone" 
                dataKey="ingresos" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <Plus className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-blue-900 font-medium">Crear Slot Manual</span>
              </div>
              <span className="text-blue-600">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-900 font-medium">Generar Horarios</span>
              </div>
              <span className="text-green-600">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-purple-900 font-medium">Ver Pacientes</span>
              </div>
              <span className="text-purple-600">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="flex items-center">
                <Stethoscope className="h-5 w-5 text-orange-600 mr-3" />
                <span className="text-orange-900 font-medium">Programar Vacaciones</span>
              </div>
              <span className="text-orange-600">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {stats?.proximas_citas && stats.proximas_citas.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
          <div className="space-y-3">
            {stats.proximas_citas.slice(0, 5).map((cita, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(cita.fecha).toLocaleDateString('es-ES')} a las {cita.hora}
                    </p>
                    <p className="text-sm text-gray-600">Slot ID: {cita.id}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {typeof cita.servicio === 'string' ? cita.servicio : cita.servicio?.nombre || 'Consulta general'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};