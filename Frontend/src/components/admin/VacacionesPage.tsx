import React, { useEffect, useState } from 'react';
import { adminAPI, Vacacion } from '../../services/adminAPI';

export const VacacionesPage: React.FC = () => {
  const [vacaciones, setVacaciones] = useState<Vacacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getVacaciones();
      setVacaciones(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setCreating(true);
    try {
      const today = new Date();
      const inicio = today.toISOString().slice(0, 10);
      const fin = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
      await adminAPI.createVacacion({ fecha_inicio: inicio, fecha_fin: fin, motivo: 'Vacaciones desde frontend' });
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Vacaciones</h2>
        <button onClick={handleCreate} disabled={creating} className="bg-blue-600 text-white px-3 py-1 rounded">Crear 7 días</button>
      </div>

      {loading ? <p>Cargando...</p> : (
        <div className="space-y-2">
          {vacaciones.map(v => (
            <div key={v.id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <div className="font-medium">{v.motivo || 'Vacación'}</div>
                <div className="text-sm text-gray-500">{v.fecha_inicio} → {v.fecha_fin}</div>
              </div>
              <div className="text-sm text-gray-600">{v.aprobada ? 'Aprobada' : 'Pendiente'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
