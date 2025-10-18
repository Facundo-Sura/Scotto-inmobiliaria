'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

// Tipo para los vehículos
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

export default function MartilleroAdmin() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar vehículos desde la API
  const fetchVehiculos = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/martillero');
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      setVehiculos(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar vehículos:', err);
      setError('No se pudieron cargar los vehículos');
      setVehiculos([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar vehículo
  const eliminarVehiculo = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      return;
    }

    try {
      const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/martillero/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      // Actualizar la lista después de eliminar
      setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id));
      alert('Vehículo eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar vehículo:', err);
      alert('Error al eliminar el vehículo');
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Cargando vehículos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchVehiculos}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestión de Vehículos</h2>
        <Link href="/admin/martillero/nuevo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Agregar Vehículo
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
                Marca
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Año
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
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vehiculo.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {vehiculo.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.marca}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.año}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${vehiculo.precio.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/admin/martillero/editar/${vehiculo.id}`} 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => eliminarVehiculo(vehiculo.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {vehiculos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay vehículos registrados.
          </div>
        )}
      </div>
    </div>
  );
}