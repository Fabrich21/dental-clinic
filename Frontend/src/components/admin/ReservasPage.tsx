import React, { useEffect, useState } from 'react';
import { adminAPI, ReservaShort } from '../../services/adminAPI';

export const ReservasPage: React.FC = () => {
  const [reservas, setReservas] = useState<ReservaShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getReservas();
        setReservas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCancel = async (id: number) => {
    try {
      await adminAPI.cancelarReserva(id);
      setReservas((r) => r.filter(x => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reservas</h2>
      {loading ? <p>Cargando...</p> : (
        <div className="space-y-2">
          {reservas.map(r => (
            <div key={r.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{r.paciente.nombre} {r.paciente.apellido}</div>
                <div className="text-sm text-gray-500">Servicio: {r.servicio?.nombre ?? '—'}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleCancel(r.id)} className="text-sm text-red-600">Cancelar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
