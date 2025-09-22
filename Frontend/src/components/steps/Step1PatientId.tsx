import React, { useState } from 'react';

interface Step1PatientIdProps {
  onNext: (data: { documentType: string; rut: string }) => void;
}

const Step1PatientId: React.FC<Step1PatientIdProps> = ({ onNext }) => {
  const [documentType, setDocumentType] = useState('Carnet de Identidad');
  const [rut, setRut] = useState('');

  const isValidRut = (rutString: string) => {
    // Remove formatting to validate
    const cleanRut = rutString.replace(/[.\-]/g, '');
    
    // Must have at least 8 characters (7 digits + 1 verification digit)
    if (cleanRut.length < 8) return false;
    
    // Must end with a digit or K
    const lastChar = cleanRut.charAt(cleanRut.length - 1);
    if (!/[0-9K]/.test(lastChar)) return false;
    
    // The rest must be digits
    const numbers = cleanRut.slice(0, -1);
    if (!/^\d+$/.test(numbers)) return false;
    
    return true;
  };

  const isFormValid = rut.trim() && isValidRut(rut) && documentType.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext({ documentType, rut });
    }
  };

  const formatRut = (value: string) => {
    // Remove all non-numeric characters except K/k
    const cleaned = value.replace(/[^\dKk]/g, '').toUpperCase();
    
    if (cleaned.length <= 1) return cleaned;
    
    // Add dots and hyphen
    const rut = cleaned.slice(0, -1);
    const dv = cleaned.slice(-1);
    
    if (rut.length <= 3) return `${rut}-${dv}`;
    if (rut.length <= 6) return `${rut.slice(0, -3)}.${rut.slice(-3)}-${dv}`;
    return `${rut.slice(0, -6)}.${rut.slice(-6, -3)}.${rut.slice(-3)}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setRut(formatted);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">
            ¿PARA QUIÉN ES LA HORA?
          </h2>
          <p className="text-gray-600">
            Complete los datos del <span className="font-medium underline">Paciente que será atendido:</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento de Identificación
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-700"
            >
              <option>Carnet de Identidad</option>
              <option>Pasaporte</option>
              <option>Carnet de Extranjería</option>
            </select>
          </div>

          {/* RUT Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> RUT del Paciente
            </label>
            <input
              type="text"
              value={rut}
              onChange={handleRutChange}
              placeholder="Ej: 8.765.432-1"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 text-gray-700 transition-colors duration-200 ${
                rut.trim() && isValidRut(rut)
                  ? 'border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-teal-50'
                  : rut.trim() && !isValidRut(rut)
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
              }`}
              maxLength={12}
              required
            />
            <p className={`text-xs mt-1 transition-colors duration-200 ${
              rut.trim() && isValidRut(rut)
                ? 'text-teal-600'
                : rut.trim() && !isValidRut(rut)
                ? 'text-red-600'
                : 'text-gray-500'
            }`}>
              {rut.trim() && isValidRut(rut)
                ? '✓ RUT válido'
                : rut.trim() && !isValidRut(rut)
                ? 'Ingrese un RUT válido'
                : 'Ingrese RUT del paciente'
              }
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full md:w-auto md:min-w-[200px] px-8 py-3 font-medium rounded-lg transition-all duration-300 ml-auto block transform ${
                isFormValid 
                  ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              CONTINUAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1PatientId;