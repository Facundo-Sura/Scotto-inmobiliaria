import Link from "next/link";
import { useState } from "react";

export default function SubastasAdmin() {
  // Datos de ejemplo para subastas
  const [subastas, setSubastas] = useState([]);
  
  const eliminarSubasta = (id: number) => {
    setSubastas(subastas.filter(subasta => subasta.id !== id));
  };
  
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
                ID
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subasta.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subasta.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subasta.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subasta.fechaFin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${subasta.precioActual.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    subasta.estado === 'activa' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {subasta.estado === 'activa' ? 'Activa' : 'Finalizada'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin/subastas/editar/${subasta.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
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
      </div>
    </div>
  );
}