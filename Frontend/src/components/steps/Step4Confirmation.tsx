import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, Phone, Mail } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableTimes: string[];
}

interface Step4ConfirmationProps {
  patientData: { documentType: string; rut: string };
  appointmentData: { 
    selectedDoctor: Doctor; 
    selectedTime: string; 
    selectedDate: string;
    area: string;
    service: string;
    region: string;
  };
  onBack: () => void;
  onConfirm: (contactData: { phone: string; email: string }) => void;
}

const Step4Confirmation: React.FC<Step4ConfirmationProps> = ({ 
  patientData, 
  appointmentData, 
  onBack, 
  onConfirm 
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePhone = (phoneNumber: string) => {
    const phoneRegex = /^(\+56)?[0-9]{8,9}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  };

  const validateEmail = (emailAddress: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress);
  };

  const handleConfirm = () => {
    let isValid = true;
    
    if (!phone.trim()) {
      setPhoneError('El número de teléfono es requerido');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Por favor ingrese un número de teléfono válido');
      isValid = false;
    } else {
      setPhoneError('');
    }
    
    if (!email.trim()) {
      setEmailError('El correo electrónico es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Por favor ingrese un correo electrónico válido');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (isValid) {
      onConfirm({ phone, email });
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Confirmación de Cita
          </h2>
          <p className="text-gray-600">
            Revise los detalles de su cita médica antes de confirmar
          </p>
        </div>

        {/* Appointment Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Patient Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-teal-500" />
              Información del Paciente
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Documento</label>
                <p className="text-gray-900">{patientData.documentType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">RUT</label>
                <p className="text-gray-900 font-mono">{patientData.rut}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-500" />
              Información de Contacto
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Ingrese su información de contacto para recibir la confirmación de su cita
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      phoneError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                </div>
                {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Profesional
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop"
                  alt={appointmentData.selectedDoctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {appointmentData.selectedDoctor.name.replace(/\n/g, ' ')}
                </p>
                <p className="text-sm text-gray-600">{appointmentData.selectedDoctor.specialty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Detalles de la Cita</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-teal-500" />
              <div>
                <label className="text-sm font-medium text-gray-500">Fecha</label>
                <p className="text-gray-900 capitalize">{formatDate(appointmentData.selectedDate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-blue-500" />
              <div>
                <label className="text-sm font-medium text-gray-500">Hora</label>
                <p className="text-gray-900 font-mono text-lg">{appointmentData.selectedTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-orange-500" />
              <div>
                <label className="text-sm font-medium text-gray-500">Centro</label>
                <p className="text-gray-900">Clínica RedSalud Elqui-Dental</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Área</label>
                <p className="text-gray-900">{appointmentData.area}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Servicio</label>
                <p className="text-gray-900">{appointmentData.service}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <h4 className="font-medium text-yellow-800 mb-2">Información Importante:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Llegue 15 minutos antes de su cita</li>
            <li>• Traiga su documento de identidad y credencial del seguro</li>
            <li>• Si no puede asistir, cancele con al menos 24 horas de anticipación</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <button
            onClick={onBack}
            className="text-teal-500 hover:text-teal-600 font-medium flex items-center"
          >
            ← VOLVER
          </button>
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <CheckCircle className="h-5 w-5" />
            <span>CONFIRMAR CITA</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4Confirmation;