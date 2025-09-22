import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgressIndicator from './components/ProgressIndicator';
import Step1PatientId from './components/steps/Step1PatientId';
import Step2SelectSpecialty from './components/steps/Step2SelectSpecialty';
import Step3SelectDateTime from './components/steps/Step3SelectDateTime';
import Step4Confirmation from './components/steps/Step4Confirmation';

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

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [specialtyData, setSpecialtyData] = useState<SpecialtyData | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const stepLabels = [
    'Identificar paciente',
    'Seleccionar especialidad',
    'Seleccionar día y hora',
    'Confirmación'
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

  const handleFinalConfirmation = () => {
    setIsCompleted(true);
    // Here you would typically send the data to your backend
    alert('¡Cita confirmada exitosamente! Recibirá un email de confirmación.');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Cita Confirmada!
              </h2>
              <p className="text-gray-600 mb-8">
                Su cita ha sido agendada exitosamente. Recibirá un email de confirmación 
                con todos los detalles de su cita médica.
              </p>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setPatientData(null);
                  setSpecialtyData(null);
                  setAppointmentData(null);
                  setIsCompleted(false);
                }}
                className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Agendar Nueva Cita
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8 px-4">
        <div className="container mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">
              Reserva de hora
            </h1>
            <p className="text-gray-600">
              Paso {currentStep}: {stepLabels[currentStep - 1]}
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={4} 
            stepLabels={stepLabels}
          />

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

          {currentStep === 3 && (
            <Step3SelectDateTime 
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
}

export default App;