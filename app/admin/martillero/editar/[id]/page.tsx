'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Vehiculo = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  caracteristicas: string[];
  imagen: string;
};

export default function EditarVehiculo() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Estado inicial con valores por defecto válidos
  const [formData, setFormData] = useState<Vehiculo>({
    id: '',
    titulo: '',
    descripcion: '',
    precio: 0,
    tipo: 'auto',
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    kilometraje: 0,
    caracteristicas: [],
    imagen: ''
  });

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/martillero/${id}`);
        
        if (!res.ok) throw new Error('Error al cargar el vehículo');
        
        const data = await res.json();
        
        // Asegurar que todos los campos tengan valores válidos
        setFormData({
          id: data.id || '',
          titulo: data.titulo || '',
          descripcion: data.descripcion || '',
          precio: data.precio || 0,
          tipo: data.tipo || 'auto',
          marca: data.marca || '',
          modelo: data.modelo || '',
          año: data.año || new Date().getFullYear(),
          kilometraje: data.kilometraje || 0,
          caracteristicas: data.caracteristicas || [],
          imagen: data.imagen || ''
        });
      } catch (err) {
        setError('No se pudo cargar el vehículo');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehiculo();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'año' || name === 'kilometraje' || name === 'precio') {
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

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim() && !formData.caracteristicas.includes(nuevaCaracteristica.trim())) {
      setFormData(prev => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()]
      }));
      setNuevaCaracteristica('');
    }
  };

  const eliminarCaracteristica = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/martillero/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al actualizar el vehículo');
      }

      const updatedData = await res.json();
      alert('Vehículo actualizado correctamente');
      router.push('/admin/martillero');
      router.refresh(); // Forzar recarga de la página
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el vehículo');
      console.error('Error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Cargando vehículo...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Vehículo</h1>
      
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

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="auto">Auto</option>
                <option value="camioneta">Camioneta</option>
                <option value="moto">Moto</option>
                <option value="camion">Camión</option>
              </select>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Marca *
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Modelo *
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Año *
                </label>
                <input
                  type="number"
                  name="año"
                  value={formData.año}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kilometraje
                </label>
                <input
                  type="number"
                  name="kilometraje"
                  value={formData.kilometraje}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                />
              </div>
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

        {/* Características */}
        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Características
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={nuevaCaracteristica}
              onChange={(e) => setNuevaCaracteristica(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nueva característica"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarCaracteristica())}
            />
            <button
              type="button"
              onClick={agregarCaracteristica}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.caracteristicas.map((caracteristica, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
              >
                {caracteristica}
                <button
                  type="button"
                  onClick={() => eliminarCaracteristica(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push('/admin/martillero')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Actualizar Vehículo'}
          </button>
        </div>
      </form>
    </div>
  );
}