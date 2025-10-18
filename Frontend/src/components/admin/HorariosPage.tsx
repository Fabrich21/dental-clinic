import React, { useEffect, useState } from 'react';
import { adminAPI, HorarioTrabajo } from '../../services/adminAPI';

export const HorariosPage: React.FC = () => {
  const [horarios, setHorarios] = useState<HorarioTrabajo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await adminAPI.getHorarios();
        setHorarios(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Horarios</h2>
      {loading ? <p>Cargando...</p> : (
        <div className="space-y-2">
          {horarios.map(h => (
            <div key={h.id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-medium">{h.dia_semana_display}</div>
                <div className="text-sm text-gray-500">{h.hora_inicio} - {h.hora_fin}</div>
              </div>
              <div className="text-sm text-gray-600">{h.activo ? 'Activo' : 'Inactivo'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
