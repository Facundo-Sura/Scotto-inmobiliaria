'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PropiedadesAdmin from './inmobiliaria/page';
import MartilleroAdmin from './martillero/page';
import SubastasAdmin from './subastas/page';

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
              <MartilleroAdmin />
            ) : (
              <SubastasAdmin />
            )}
          </div>
        </main>
      </div>
    </AdminProtected>
  );
}