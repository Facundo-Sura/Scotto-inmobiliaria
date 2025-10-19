'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Subasta = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
};

export default function EditarSubasta() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState<Subasta>({
    id: '',
    titulo: '',
    descripcion: '',
    imagen: '',
    precioInicial: 0,
    precioActual: 0,
    fechaInicio: '',
    fechaFin: '',
    estado: 'proximamente',
    categoria: 'inmuebles',
    ofertas: 0
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubasta = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/subastas/${id}`);
        
        if (!res.ok) throw new Error('Error al cargar la subasta');
        
        const data = await res.json();
        // Formatear fechas para input datetime-local
        const subastaFormateada = {
          ...data,
          fechaInicio: data.fechaInicio ? data.fechaInicio.split('T')[0] : '',
          fechaFin: data.fechaFin ? data.fechaFin.split('T')[0] : ''
        };
        setFormData(subastaFormateada);
      } catch (err) {
        setError('No se pudo cargar la subasta');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubasta();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'precioInicial' || name === 'precioActual' || name === 'ofertas') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);
  setError('');

  try {
    console.log('Enviando datos:', formData);
    
    const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/martillero/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error response:', errorText);
      throw new Error(`Error ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    console.log('Success response:', result);
    
    alert('Vehículo actualizado correctamente');
    router.push('/admin/martillero');
    router.refresh();
  } catch (err) {
    console.error('Error completo:', err);
    setError(err instanceof Error ? err.message : 'Error al actualizar el vehículo');
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Cargando subasta...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Subasta</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Título *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Precio Inicial *
                </label>
                <input
                  type="number"
                  name="precioInicial"
                  value={formData.precioInicial}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Precio Actual *
                </label>
                <input
                  type="number"
                  name="precioActual"
                  value={formData.precioActual}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Estado *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="proximamente">Próximamente</option>
                <option value="activa">Activa</option>
                <option value="finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="inmuebles">Inmuebles</option>
                <option value="vehiculos">Vehículos</option>
                <option value="terrenos">Terrenos</option>
                <option value="coleccionables">Coleccionables</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fecha de Inicio *
              </label>
              <input
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fecha de Fin *
              </label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ofertas
              </label>
              <input
                type="number"
                name="ofertas"
                value={formData.ofertas}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                URL de Imagen *
              </label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push('/admin/subastas')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Actualizar Subasta'}
          </button>
        </div>
      </form>
    </div>
  );
}