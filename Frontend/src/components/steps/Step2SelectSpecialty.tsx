import React, { useState } from 'react';

interface Step2SelectSpecialtyProps {
  onNext: (data: { 
    searchType: 'specialty' | 'professional';
    area: string;
    service: string;
    region: string;
  }) => void;
  onBack: () => void;
}

const Step2SelectSpecialty: React.FC<Step2SelectSpecialtyProps> = ({ onNext, onBack }) => {
  const [searchType, setSearchType] = useState<'specialty' | 'professional'>('specialty');
  const [area, setArea] = useState('Dental');
  const [selectedService, setSelectedService] = useState('Diagnóstico Inicial');
  const [service, setService] = useState('');
  const [region, setRegion] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const areas = ['Dental', 'GES Dental'];
  const services = ['Diagnóstico Inicial', 'Diagnóstico por Derivación', 'Control de Especialidad', 'Preventivo Dental'];
  const regions = [
    'Región de Coquimbo',
    'Región de Antofagasta',
  ];
  const doctors = [
    'Dr. Juan Pérez - Odontólogo General',
    'Dra. María González - Ortodoncista',
    'Dr. Carlos Silva - Endodoncista',
    'Dra. Ana Martínez - Periodoncista',
    'Dr. Luis Fernández - Cirujano Oral'
  ];

  const isFormValid = searchType === 'specialty' 
    ? service.trim() && region.trim()
    : selectedDoctor.trim() && service.trim() && region.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({ searchType, area, service, region });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {/* Search Type Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            type="button"
            onClick={() => setSearchType('specialty')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
              searchType === 'specialty'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Búsqueda por especialidad
          </button>
          <button
            type="button"
            onClick={() => setSearchType('professional')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors ${
              searchType === 'professional'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Búsqueda por profesional
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Area Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Área
            </label>
            <div className="flex flex-wrap gap-3">
              {areas.map((areaOption) => (
                <button
                  key={areaOption}
                  type="button"
                  onClick={() => setArea(areaOption)}
                  className={`px-4 py-2 rounded-full border font-medium transition-colors ${
                    area === areaOption
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-teal-300'
                  }`}
                >
                  {areaOption === 'Dental' && (
                    <span className="mr-1">✓</span>
                  )}
                  {areaOption}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Fields Based on Search Type */}
          {searchType === 'specialty' ? (
            /* Service and Region Selects for Specialty Search */
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Servicio
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors duration-200 ${
                    service.trim()
                      ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                      : 'border-red-300 focus:ring-teal-500 focus:border-teal-500'
                  }`}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((serviceOption) => (
                    <option key={serviceOption} value={serviceOption}>
                      {serviceOption}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Región
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors duration-200 ${
                    region.trim()
                      ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                      : 'border-red-300 focus:ring-teal-500 focus:border-teal-500'
                  }`}
                  required
                >
                  <option value="">Selecciona una región</option>
                  {regions.map((regionOption) => (
                    <option key={regionOption} value={regionOption}>
                      {regionOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            /* Doctor, Service and Region Selects for Professional Search */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="text-red-500">*</span> Médico/Profesional
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors duration-200 ${
                    selectedDoctor.trim()
                      ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                      : 'border-red-300 focus:ring-teal-500 focus:border-teal-500'
                  }`}
                  required
                >
                  <option value="">Selecciona un médico</option>
                  {doctors.map((doctorOption) => (
                    <option key={doctorOption} value={doctorOption}>
                      {doctorOption}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> Servicio
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors duration-200 ${
                      service.trim()
                        ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                        : 'border-red-300 focus:ring-teal-500 focus:border-teal-500'
                    }`}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((serviceOption) => (
                      <option key={serviceOption} value={serviceOption}>
                        {serviceOption}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="text-red-500">*</span> Región
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors duration-200 ${
                      region.trim()
                        ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                        : 'border-red-300 focus:ring-teal-500 focus:border-teal-500'
                    }`}
                    required
                  >
                    <option value="">Selecciona una región</option>
                    {regions.map((regionOption) => (
                      <option key={regionOption} value={regionOption}>
                        {regionOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="text-teal-500 hover:text-teal-600 font-medium flex items-center"
            >
              ← VOLVER
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 transform ${
                isFormValid
                  ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              BUSCAR HORAS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2SelectSpecialty;