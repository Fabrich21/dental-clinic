import React, { useEffect, useState } from 'react';
import { adminAPI, Slot } from '../../services/adminAPI';

export const AgendaPage: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getAgenda();
        setSlots(data as Slot[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Mi Agenda</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {slots.map((s) => (
            <div key={s.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{s.servicio?.nombre ?? 'Sin servicio'}</div>
                <div className="text-sm text-gray-500">{s.fecha} · {s.hora}</div>
              </div>
              <div className="text-sm text-gray-700">{s.reservas_count}/{s.capacidad}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
