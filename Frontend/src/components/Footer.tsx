import React from 'react';
import { Calendar, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-400">SALUD - UCN</h3>
                <p className="text-xs text-gray-400">Sistema de Citas</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu salud es nuestra prioridad. Ofrecemos servicios médicos de calidad 
              con profesionales altamente capacitados y tecnología de última generación.
            </p>
            <div className="flex space-x-3">
              <button className="p-2 bg-gray-800 hover:bg-teal-600 rounded-lg transition-colors">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-teal-600 rounded-lg transition-colors">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-teal-600 rounded-lg transition-colors">
                <Instagram className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800 hover:bg-teal-600 rounded-lg transition-colors">
                <Youtube className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Odontología General</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Ortodoncia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Implante Dental</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Endodoncia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Periodoncia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Odontopediatría</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Prótesis Dental</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Estética Dental</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Urgencias Dentales</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Reservar Hora</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Consultar Hora</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Anular Hora</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Cambiar Hora</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Seguros</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">Mesa Central</p>
                  <p className="text-white font-medium">600 600 3000</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">info@saludUcn.cl</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-teal-400 mt-0.5" />
                <div>
                  <p className="text-gray-400">Dirección</p>
                  <p className="text-white">Larrondo 123<br />Coquimbo, Chile</p>
                </div>
              </div>
            </div>

            {/* Emergency */}
            <div className="mt-6 p-4 bg-red-900 bg-opacity-50 rounded-lg border border-red-800">
              <h5 className="font-semibold text-red-200 mb-2">Urgencias 24/7</h5>
              <p className="text-red-100 text-sm">131 (desde celular)</p>
              <p className="text-red-100 text-sm">1414 (desde red fija)</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 SaludUcn. Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Términos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;