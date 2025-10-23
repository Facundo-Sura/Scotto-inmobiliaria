'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

type Propiedad = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: 'casa' | 'departamento' | 'terreno' | 'local';
  operacion: 'venta' | 'alquiler';
  direccion: string;
  habitaciones: number | null;
  metros: number | null;
  imagen: string | null;
  created_at: string;
  updated_at: string;
};

interface PropiedadFromAPI {
  id?: string;
  titulo?: string;
  descripcion?: string;
  precio?: number | string;
  tipo?: string;
  operacion?: string;
  direccion?: string;
  habitaciones?: number | string | null;
  metros?: number | string | null;
  imagen?: string | null;
  imagenes?: string[];
  tipos_archivos?: string[];
  created_at?: string;
  updated_at?: string;
}

export default function PropiedadesAdmin() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPropiedades = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/inmobiliaria');
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      
      const propiedadesValidas = data.map((propiedad: PropiedadFromAPI) => ({
        id: propiedad.id || '',
        titulo: propiedad.titulo || '',
        descripcion: propiedad.descripcion || '',
        precio: Number(propiedad.precio) || 0,
        tipo: (propiedad.tipo as 'casa' | 'departamento' | 'terreno' | 'local') || 'casa',
        operacion: (propiedad.operacion as 'venta' | 'alquiler') || 'venta',
        direccion: propiedad.direccion || '',
        habitaciones: propiedad.habitaciones ? Number(propiedad.habitaciones) : null,
        metros: propiedad.metros ? Number(propiedad.metros) : null,
        imagen: propiedad.imagen || propiedad.imagenes?.[0] || null,
        created_at: propiedad.created_at || '',
        updated_at: propiedad.updated_at || ''
      }));
      
      setPropiedades(propiedadesValidas);
      setError(null);
    } catch (err) {
      console.error('Error al cargar propiedades:', err);
      setError('No se pudieron cargar las propiedades');
      setPropiedades([]);
    } finally {
      setLoading(false);
    }
  };

  const eliminarPropiedad = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      return;
    }

    try {
      const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/inmobiliaria/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      setPropiedades(propiedades.filter(propiedad => propiedad.id !== id));
      alert('Propiedad eliminada correctamente');
    } catch (err) {
      console.error('Error al eliminar propiedad:', err);
      alert('Error al eliminar la propiedad');
    }
  };

  useEffect(() => {
    fetchPropiedades();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-2">Cargando propiedades...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchPropiedades}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestión de Propiedades</h2>
        <Link href="/admin/inmobiliaria/nueva" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Agregar Propiedad
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Operación
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dirección
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {propiedades.map((propiedad) => (
              <tr key={propiedad.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {propiedad.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {propiedad.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {propiedad.operacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {propiedad.direccion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${propiedad.precio?.toLocaleString() ?? '0'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/admin/inmobiliaria/editar/${propiedad.id}`} 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarPropiedad(propiedad.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {propiedades.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay propiedades registradas.
          </div>
        )}
      </div>
    </div>
  );
}