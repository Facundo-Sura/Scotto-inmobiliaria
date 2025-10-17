import Link from "next/link";
import { useState } from "react";

export default function MartilleroAdmin() {
  // Datos de ejemplo para vehículos
  const [vehiculos, setVehiculos] = useState([]);
  
  const eliminarVehiculo = 
  
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
                ID
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vehiculo.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vehiculo.marca}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${vehiculo.precio.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin/vehiculos/editar/${vehiculo.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
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
      </div>
    </div>
  );
}