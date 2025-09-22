import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Share2 } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableTimes: string[];
}

interface Step3SelectDateTimeProps {
  onNext: (data: { selectedDoctor: Doctor; selectedTime: string; selectedDate: string }) => void;
  onBack: () => void;
}

const Step3SelectDateTime: React.FC<Step3SelectDateTimeProps> = ({ onNext, onBack }) => {
  // Generate dynamic dates starting from today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
    
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      const dayName = dayNames[currentDate.getDay()];
      const dayNum = currentDate.getDate().toString();
      const monthName = monthNames[currentDate.getMonth()];
      
      dates.push({
        date: dateString,
        day: dayName,
        dayNum: dayNum,
        month: monthName,
        unavailable: currentDate.getDay() === 0 // Sundays unavailable
      });
    }
    
    return dates;
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock data for doctors
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Ignacio\nAlejandro\nAraya\nRodríguez',
      specialty: 'Diagnóstico Dental',
      image: '/api/placeholder/120/120',
      availableTimes: ['12:45', '14:30', '16:15', '17:00']
    },
    {
      id: '2',
      name: 'Solange\nAlejandra\nBarraza\nVergara',
      specialty: 'Diagnóstico Dental',
      image: '/api/placeholder/120/120',
      availableTimes: ['12:45', '13:30', '15:15', '16:45']
    },
    {
      id: '3',
      name: 'Valentina\nSandibel\nHurtado\nMoya',
      specialty: 'Diagnóstico Dental',
      image: '/api/placeholder/120/120',
      availableTimes: ['12:45', '14:00', '15:30', '17:15']
    }
  ];

  const handleTimeSelect = (doctor: Doctor, time: string) => {
    setSelectedDoctor(doctor);
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDoctor && selectedTime) {
      onNext({ selectedDoctor, selectedTime, selectedDate });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <p className="text-teal-600 font-medium mb-1">
              Área Dental - DIAGNÓSTICO DENTAL
            </p>
            <p className="text-sm text-gray-600">
              (7 Profesionales)
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
              <Share2 className="h-4 w-4" />
              Compartir Búsqueda
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.date}
                  onClick={() => !date.unavailable && setSelectedDate(date.date)}
                  disabled={date.unavailable}
                  className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg border-2 transition-colors ${
                    selectedDate === date.date
                      ? 'border-teal-500 bg-teal-50'
                      : date.unavailable
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                        : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <span className="text-xs text-gray-500">{date.month}</span>
                  <span className="text-lg font-bold text-teal-600">{date.dayNum}</span>
                  <span className="text-xs text-gray-600">{date.day}</span>
                  {date.unavailable && (
                    <span className="text-xs text-gray-400">(Sin Horas)</span>
                  )}
                </button>
              ))}
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Clinic Header */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <h3 className="font-medium text-gray-900">Clínica RedSalud Elqui-Dental</h3>
          </div>
          <button className="text-teal-600 hover:text-teal-700">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Doctor Image */}
                <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Doctor Name */}
                <h4 className="font-medium text-gray-900 mb-2 leading-tight">
                  {doctor.name.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </h4>
                
                {/* Specialty */}
                <p className="text-sm text-gray-600 mb-4">{doctor.specialty}</p>

                {/* Available Times */}
                <div className="space-y-2 w-full">
                  {doctor.availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(doctor, time)}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedDoctor?.id === doctor.id && selectedTime === time
                          ? 'bg-teal-500 text-white'
                          : 'bg-teal-500 text-white hover:bg-teal-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                  
                  {/* Additional Actions */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex items-center justify-center gap-1 px-3 py-2 text-xs border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
                      <Share2 className="h-3 w-3" />
                      Compartir
                    </button>
                    <button className="px-3 py-2 text-xs bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors">
                      Ver más horas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t">
          <button
            onClick={onBack}
            className="text-teal-500 hover:text-teal-600 font-medium flex items-center"
          >
            ← VOLVER
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedDoctor || !selectedTime}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200"
          >
            CONTINUAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3SelectDateTime;