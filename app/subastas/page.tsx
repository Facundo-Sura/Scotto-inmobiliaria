'use client';

import React, { useState, useEffect } from 'react';
import SubastaList from '../components/SubastaList';

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

export default function SubastasPage() {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubastas = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const response = await fetch(`${apiUrl}/subastas`);
        
        if (!response.ok) {
          throw new Error('Error al cargar las subastas');
        }
        
        const data = await response.json();
        setSubastas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las subastas');
      } finally {
        setLoading(false);
      }
    };

    fetchSubastas();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando subastas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Subastas Online
          </h1>
          <p className="text-xl mb-8">
            Oportunidades únicas en propiedades, vehículos y artículos exclusivos
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Ver Subastas Activas
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg transition duration-300">
              Cómo Participar
            </button>
          </div>
        </div>
      </section>

      {/* Listado de Subastas con Filtros */}
      <SubastaList subastas={subastas} />

      {/* Sección de Información */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            ¿Cómo Funcionan Nuestras Subastas?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Registro</h3>
              <p className="text-gray-600">
                Regístrate como usuario y completa tu perfil para participar en las subastas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Oferta</h3>
              <p className="text-gray-600">
                Haz tu oferta durante el período activo de la subasta. Puedes mejorar tu oferta en cualquier momento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Adjudicación</h3>
              <p className="text-gray-600">
                Al finalizar la subasta, el mejor postor será contactado para completar la transacción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl mb-8">
            Regístrate ahora y comienza a participar en nuestras subastas exclusivas.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Crear Cuenta
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg transition duration-300">
              Contactar Asesor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}