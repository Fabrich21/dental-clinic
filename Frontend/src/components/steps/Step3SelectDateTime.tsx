import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter, Share2 } from 'lucide-react';
import { dentistaService, agendaService, Dentista } from '../../services/dentalClinicService';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availableTimes: string[];
  overtimeTimes?: string[];
}

interface Step3SelectDateTimeProps {
  specialtyData?: {
    region: string;
    regionId?: number;
  };
  onNext: (data: { selectedDoctor: Doctor; selectedTime: string; selectedDate: string }) => void;
  onBack: () => void;
}

const Step3SelectDateTime: React.FC<Step3SelectDateTimeProps> = ({ specialtyData, onNext, onBack }) => {
  // Generate dynamic dates starting from today (14 days)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
    
    for (let i = 0; i < 14; i++) {
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

  // Obtener horarios ocupados desde el backend
  const getOccupiedTimes = (doctorId: string, date: string): string[] => {
    return occupiedTimes[doctorId]?.[date] || [];
  };

  // Cargar horarios ocupados para un dentista en una fecha específica
  const loadOccupiedTimes = async (dentistaId: number, fecha: string) => {
    try {
      const response = await agendaService.getReservasByDentistaAndDate(dentistaId, fecha);
      const reservas = response.data || [];
      
      // Extraer los horarios ocupados de las reservas
      const horariosOcupados = reservas.map((reserva: { slot?: { hora?: string } }) => {
        // Formatear la hora desde el slot (asumiendo formato HH:MM:SS -> HH:MM)
        const hora = reserva.slot?.hora || '';
        return hora.length > 5 ? hora.substring(0, 5) : hora; // Obtener solo HH:MM
      });
      
      setOccupiedTimes(prev => ({
        ...prev,
        [dentistaId.toString()]: {
          ...prev[dentistaId.toString()],
          [fecha]: horariosOcupados
        }
      }));
    } catch (error) {
      console.error('Error cargando horarios ocupados:', error);
      // En caso de error, mantener array vacío (todos los horarios disponibles)
      setOccupiedTimes(prev => ({
        ...prev,
        [dentistaId.toString()]: {
          ...prev[dentistaId.toString()],
          [fecha]: []
        }
      }));
    }
  };

  const dates = generateDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].date);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Estados para datos de la API
  const [apiDoctors, setApiDoctors] = useState<Dentista[]>([]);
  const [filteredApiDoctors, setFilteredApiDoctors] = useState<Dentista[]>([]);
  const [loading, setLoading] = useState(true);
  const [occupiedTimes, setOccupiedTimes] = useState<Record<string, Record<string, string[]>>>({});

  // Cargar doctores de la API
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const response = await dentistaService.getAll();
        setApiDoctors(response.data);
      } catch (error) {
        console.error('Error cargando doctores:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Cargar horarios ocupados cuando cambien los doctores o la fecha
  useEffect(() => {
    const loadAllOccupiedTimes = async () => {
      if (filteredApiDoctors.length === 0) return;
      
      // Cargar horarios ocupados para todos los doctores en la fecha seleccionada
      const loadPromises = filteredApiDoctors.map(doctor => 
        loadOccupiedTimes(doctor.id, selectedDate)
      );
      
      await Promise.all(loadPromises);
    };

    loadAllOccupiedTimes();
  }, [filteredApiDoctors, selectedDate]);

  // Filtrar doctores por región seleccionada cuando cambien los datos
  useEffect(() => {
    const filtered = specialtyData?.region 
      ? apiDoctors.filter(doctor => doctor.region?.nombre === specialtyData.region)
      : apiDoctors;
    setFilteredApiDoctors(filtered);
  }, [apiDoctors, specialtyData?.region]);

  // Convertir doctores de API al formato local (manteniendo compatibilidad)
  const doctors: Doctor[] = filteredApiDoctors.map(apiDoc => {
    const regularTimes = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30'];
    const overtimeTimes = ['16:30', '17:00', '17:30']; // Horarios de sobrecupo extendidos
    
    return {
      id: apiDoc.id.toString(),
      name: `${apiDoc.nombre} ${apiDoc.apellido}`.replace(' ', '\n'),
      specialty: apiDoc.especialidad || 'Diagnóstico Dental',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop',
      availableTimes: regularTimes,
      overtimeTimes: overtimeTimes
    };
  });

  const handleTimeSelect = (doctor: Doctor, time: string) => {
    const occupiedTimes = getOccupiedTimes(doctor.id, selectedDate);
    
    // No permitir seleccionar horarios ocupados
    if (occupiedTimes.includes(time)) {
      return;
    }
    
    setSelectedDoctor(doctor);
    setSelectedTime(time);
  };

  // Verificar si un horario está disponible
  const isTimeAvailable = (doctorId: string, time: string): boolean => {
    const occupiedTimes = getOccupiedTimes(doctorId, selectedDate);
    return !occupiedTimes.includes(time);
  };

  const handleContinue = () => {
    if (selectedDoctor && selectedTime) {
      onNext({ selectedDoctor, selectedTime, selectedDate });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
            <p className="mt-4 text-gray-600">Cargando doctores disponibles...</p>
          </div>
        </div>
      </div>
    );
  }

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
        {doctors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay doctores disponibles</h3>
              <p className="text-gray-600">
                No se encontraron doctores en la región seleccionada: <span className="font-medium">{specialtyData?.region}</span>
              </p>
            </div>
          </div>
        ) : (
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
                <div className="space-y-3 w-full">
                  {/* Horarios Presenciales */}
                  {doctor.availableTimes.length > 0 && (
                    <>
                      <button className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg">
                        Presencial
                      </button>
                      <div className="grid grid-cols-4 gap-2">
                        {doctor.availableTimes.map((time) => {
                          const isOccupied = !isTimeAvailable(doctor.id, time);
                          const isSelected = selectedDoctor?.id === doctor.id && selectedTime === time;
                          
                          return (
                            <button
                              key={time}
                              onClick={() => handleTimeSelect(doctor, time)}
                              disabled={isOccupied}
                              className={`py-2 px-3 rounded-md text-xs font-medium transition-colors border ${
                                isOccupied
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                                  : isSelected
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Horarios de Sobrecupo */}
                  {doctor.overtimeTimes && doctor.overtimeTimes.length > 0 && (
                    <>
                      <div className="pt-2">
                        <p className="text-xs text-gray-600 mb-2">
                          Tenemos sólo horas de <span className="font-medium">Sobrecupo</span> disponibles
                        </p>
                        <button className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg mb-2">
                          Sobrecupos
                        </button>
                        <div className="grid grid-cols-4 gap-2">
                          {doctor.overtimeTimes.map((time) => {
                            const isOccupied = !isTimeAvailable(doctor.id, time);
                            const isSelected = selectedDoctor?.id === doctor.id && selectedTime === time;
                            
                            return (
                              <button
                                key={`overtime-${time}`}
                                onClick={() => handleTimeSelect(doctor, time)}
                                disabled={isOccupied}
                                className={`py-2 px-3 rounded-md text-xs font-medium transition-colors border ${
                                  isOccupied
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300'
                                    : isSelected
                                    ? 'bg-orange-600 text-white border-orange-600'
                                    : 'bg-white text-orange-600 border-orange-600 hover:bg-orange-50'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Additional Actions */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex items-center justify-center gap-1 px-3 py-2 text-xs border border-teal-500 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
                      <Share2 className="h-3 w-3" />
                      Compartir
                    </button>
                    <button className="px-3 py-2 text-xs bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors">
                      Más horas del profesional
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Selection Confirmation */}
        {selectedDoctor && selectedTime && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-green-800 mb-1">✓ Hora seleccionada</h4>
                <p className="text-sm text-green-700">
                  <span className="font-medium">{selectedDoctor.name.replace('\n', ' ')}</span> - {selectedTime} el {dates.find(d => d.date === selectedDate)?.day} {dates.find(d => d.date === selectedDate)?.dayNum} de {dates.find(d => d.date === selectedDate)?.month}
                </p>
                <p className="text-xs text-green-600 mt-1">¿Desea continuar con esta reserva?</p>
              </div>
            </div>
          </div>
        )}

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
            className={`px-8 py-3 font-medium rounded-lg transition-all duration-200 ${
              selectedDoctor && selectedTime
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {selectedDoctor && selectedTime ? 'CONFIRMAR RESERVA' : 'SELECCIONE UNA HORA'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3SelectDateTime;