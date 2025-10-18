import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MapPin, Clock } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Dental Clinic</h1>
            </div>
            <Link 
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Acceso Profesionales
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a Dental Clinic
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu salud dental es nuestra prioridad. Ofrecemos servicios odontológicos de calidad 
            con profesionales especializados.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultas Generales</h3>
            <p className="text-gray-600">Exámenes preventivos y diagnósticos completos para mantener tu salud dental.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Limpiezas Dentales</h3>
            <p className="text-gray-600">Profilaxis profesional para mantener tus dientes y encías saludables.</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tratamientos Especializados</h3>
            <p className="text-gray-600">Endodoncia, ortodoncia y cirugía oral con tecnología avanzada.</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Contáctanos</h3>
            <p className="text-gray-600">Agenda tu cita o consulta información</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
              <Phone className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Teléfono</p>
                <p className="text-gray-600">+56 9 1234 5678</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Dirección</p>
                <p className="text-gray-600">Av. Providencia 1234</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Horarios</p>
                <p className="text-gray-600">Lun-Vie 9:00-18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas una cita?</h3>
            <p className="text-blue-100 mb-6">
              Llámanos para agendar tu próxima visita o consultar disponibilidad
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Llamar Ahora
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Dental Clinic. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};