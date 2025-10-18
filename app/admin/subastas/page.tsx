'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

// Tipo para las subastas
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

export default function SubastasAdmin() {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar subastas desde la API
  const fetchSubastas = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/subastas');
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      setSubastas(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar subastas:', err);
      setError('No se pudieron cargar las subastas');
      setSubastas([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar subasta
  const eliminarSubasta = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta subasta?')) {
      return;
    }

    try {
      const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/subastas/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      // Actualizar la lista después de eliminar
      setSubastas(subastas.filter(subasta => subasta.id !== id));
      alert('Subasta eliminada correctamente');
    } catch (err) {
      console.error('Error al eliminar subasta:', err);
      alert('Error al eliminar la subasta');
    }
  };

  useEffect(() => {
    fetchSubastas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Cargando subastas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchSubastas}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestión de Subastas</h2>
        <Link href="/admin/subastas/nueva" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Crear Subasta
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
                Categoría
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Fin
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio Actual
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ofertas
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subastas.map((subasta) => (
              <tr key={subasta.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subasta.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {subasta.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(subasta.fechaFin).toLocaleDateString('es-AR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${subasta.precioActual.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subasta.ofertas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    subasta.estado === 'activa' 
                      ? 'bg-green-100 text-green-800' 
                      : subasta.estado === 'proximamente'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {subasta.estado === 'activa' ? 'Activa' : 
                     subasta.estado === 'proximamente' ? 'Próximamente' : 'Finalizada'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/admin/subastas/editar/${subasta.id}`} 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarSubasta(subasta.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {subastas.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay subastas registradas.
          </div>
        )}
      </div>
    </div>
  );
}