'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Componente de protección para rutas de administrador
function AdminProtected({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }
  
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }
  
  return <>{children}</>;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('propiedades');
  
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-black text-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Tabs de navegación */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('propiedades')}
                className={`${
                  activeTab === 'propiedades'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Inmobiliaria
              </button>
              <button
                onClick={() => setActiveTab('vehiculos')}
                className={`${
                  activeTab === 'vehiculos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Martillero
              </button>
              <button
                onClick={() => setActiveTab('subastas')}
                className={`${
                  activeTab === 'subastas'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Subastas
              </button>
            </nav>
          </div>
          
          {/* Contenido según la pestaña activa */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            {activeTab === 'propiedades' ? (
              <PropiedadesAdmin />
            ) : activeTab === 'vehiculos' ? (
              <VehiculosAdmin />
            ) : (
              <SubastasAdmin />
            )}
          </div>
        </main>
      </div>
    </AdminProtected>
  );
}

// Componente para administrar subastas
function SubastasAdmin() {
  // Datos de ejemplo para subastas
  const [subastas, setSubastas] = useState([
    {
      id: 1,
      titulo: 'Subasta de Arte Contemporáneo',
      categoria: 'arte',
      fechaFin: '2024-12-15',
      precioActual: 2500,
      estado: 'activa',
    },
    {
      id: 2,
      titulo: 'Subasta de Antigüedades',
      categoria: 'antigüedades',
      fechaFin: '2024-11-30',
      precioActual: 1200,
      estado: 'activa',
    },
    {
      id: 3,
      titulo: 'Subasta de Joyería',
      categoria: 'joyería',
      fechaFin: '2024-12-20',
      precioActual: 5000,
      estado: 'activa',
    },
    {
      id: 4,
      titulo: 'Subasta de Vehículos Clásicos',
      categoria: 'vehículos',
      fechaFin: '2024-10-25',
      precioActual: 18000,
      estado: 'finalizada',
    },
  ]);
  
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

// Componente para administrar propiedades
function PropiedadesAdmin() {
  // Datos de ejemplo para propiedades
  const [propiedades, setPropiedades] = useState([
    {
      id: 1,
      titulo: 'Casa en Barrio Norte',
      tipo: 'venta',
      categoria: 'casa',
      precio: 150000,
    },
    {
      id: 2,
      titulo: 'Departamento céntrico',
      tipo: 'venta',
      categoria: 'departamento',
      precio: 80000,
    },
    {
      id: 3,
      titulo: 'Terreno en zona residencial',
      tipo: 'venta',
      categoria: 'terreno',
      precio: 50000,
    },
    {
      id: 4,
      titulo: 'Casa para alquiler',
      tipo: 'alquiler',
      categoria: 'casa',
      precio: 500,
    },
  ]);
  
  const eliminarPropiedad = (id: number) => {
    setPropiedades(propiedades.filter(prop => prop.id !== id));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestión de Propiedades</h2>
        <Link href="/admin/propiedades/nueva" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Agregar Propiedad
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
                Categoría
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {propiedad.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {propiedad.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {propiedad.tipo === 'venta' ? 'Venta' : 'Alquiler'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {propiedad.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${propiedad.precio.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/admin/propiedades/editar/${propiedad.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
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
      </div>
    </div>
  );
}

// Componente para administrar vehículos
function VehiculosAdmin() {
  // Datos de ejemplo para vehículos
  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      titulo: 'Toyota Corolla 2019',
      tipo: 'auto',
      marca: 'Toyota',
      precio: 15000,
    },
    {
      id: 2,
      titulo: 'Ford Ranger 2018',
      tipo: 'camioneta',
      marca: 'Ford',
      precio: 25000,
    },
    {
      id: 3,
      titulo: 'Volkswagen Gol 2020',
      tipo: 'auto',
      marca: 'Volkswagen',
      precio: 10000,
    },
    {
      id: 4,
      titulo: 'Honda CB 190R 2021',
      tipo: 'moto',
      marca: 'Honda',
      precio: 3000,
    },
  ]);
  
  const eliminarVehiculo = (id: number) => {
    setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Gestión de Vehículos</h2>
        <Link href="/admin/vehiculos/nuevo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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