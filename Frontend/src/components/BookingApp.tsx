import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProgressIndicator from './ProgressIndicator';
import Step1PatientId from './steps/Step1PatientId';
import Step2SelectSpecialty from './steps/Step2SelectSpecialty';
import Step3SelectDateTime from './steps/Step3SelectDateTime';
import Step4Confirmation from './steps/Step4Confirmation';
import { Settings } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableTimes: string[];
}

interface PatientData {
  documentType: string;
  rut: string;
  nombre?: string;
  apellido?: string;
  patientId?: number;
  isExistingPatient: boolean;
}

interface SpecialtyData {
  searchType: 'specialty' | 'professional';
  area: string;
  service: string;
  region: string;
}

interface AppointmentData {
  selectedDoctor: Doctor;
  selectedTime: string;
  selectedDate: string;
}

export const BookingApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [specialtyData, setSpecialtyData] = useState<SpecialtyData | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const stepLabels = [
    'Identificar paciente',
    'Seleccionar especialidad',
    'Seleccionar día y hora',
    'Confirmar cita'
  ];

  const handleStep1Complete = (data: PatientData) => {
    setPatientData(data);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: SpecialtyData) => {
    setSpecialtyData(data);
    setCurrentStep(3);
  };

  const handleStep3Complete = (data: AppointmentData) => {
    setAppointmentData(data);
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalConfirmation = () => {
    setIsCompleted(true);
    // Here you would typically send the data to your backend
    console.log('Booking confirmed:', {
      patient: patientData,
      specialty: specialtyData,
      appointment: appointmentData
    });
  };

  const handleReset = () => {
    setCurrentStep(1);
    setPatientData(null);
    setSpecialtyData(null);
    setAppointmentData(null);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        {/* Admin access button */}
        <div className="fixed top-4 right-4 z-50">
          <Link 
            to="/admin/login"
            className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            title="Acceso Dentistas"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Acceso Profesionales</span>
          </Link>
        </div>

        <main className="max-w-4xl mx-auto py-8 px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Cita confirmada!</h2>
            <p className="text-gray-600 mb-6">
              Tu cita ha sido reservada exitosamente. Recibirás un correo de confirmación con todos los detalles.
            </p>
            <button
              onClick={handleReset}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agendar otra cita
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Admin access button */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/admin/login"
          className="bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          title="Acceso Dentistas"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Acceso Profesionales</span>
        </Link>
      </div>
      
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Progress Indicator */}
          <div className="px-6 py-4 border-b border-gray-200">
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={4} 
              stepLabels={stepLabels}
            />
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <Step1PatientId onNext={handleStep1Complete} />
          )}

          {currentStep === 2 && (
            <Step2SelectSpecialty 
              onNext={handleStep2Complete}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && specialtyData && (
            <Step3SelectDateTime 
              specialtyData={specialtyData}
              onNext={handleStep3Complete}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && patientData && specialtyData && appointmentData && (
            <Step4Confirmation
              patientData={patientData}
              appointmentData={{
                ...appointmentData,
                ...specialtyData
              }}
              onBack={handleBack}
              onConfirm={handleFinalConfirmation}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};