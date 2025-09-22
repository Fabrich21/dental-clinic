import React from 'react';
import { Calendar, Phone, Clock, FileText, RotateCcw, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-600">SALUD - UCN</h1>
              <p className="text-xs text-gray-500">Sistema de Citas</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-1 px-3 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Reserva hora</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors">
              <Phone className="h-4 w-4" />
              <span>Consultar hora</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors">
              <FileText className="h-4 w-4" />
              <span>Confirmar hora</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors">
              <RotateCcw className="h-4 w-4" />
              <span>Anular hora</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors">
              <Clock className="h-4 w-4" />
              <span>Cambiar hora</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Info className="h-4 w-4" />
              <span>Más información</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-teal-600">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;