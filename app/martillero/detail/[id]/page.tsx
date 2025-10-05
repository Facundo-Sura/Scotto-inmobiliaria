"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from '../../../components/ImageCarousel';

// Tipo para los vehículos
type Vehiculo = {
  id: number;
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
  imagenes: string[];
  detalles: {
    combustible: string;
    transmision: string;
    motor: string;
    cilindrada: string;
    potencia: string;
    traccion: string;
    color: string;
    puertas: number;
    asientos: number;
    equipamiento: string[];
  };
};

interface VehiculoDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function VehiculoDetailPage({ params }: VehiculoDetailPageProps) {
  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams?.id) return;
    
    const fetchVehiculo = async () => {
      try {
        const vehiculoId = parseInt(resolvedParams.id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/data/vehiculos.json`);
        
        if (!res.ok) {
          throw new Error('Error al cargar los datos de vehículos');
        }
        
        const data = await res.json();
        const vehiculoEncontrado = data.vehiculos.find((v: Vehiculo) => v.id === vehiculoId);
        
        if (!vehiculoEncontrado) {
          setError('Vehículo no encontrado');
          return;
        }
        
        setVehiculo(vehiculoEncontrado);
      } catch (err) {
        console.error('Error al cargar los datos de vehículos:', err);
        setError('Error al cargar el vehículo');
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculo();
  }, [resolvedParams?.id]);

  const handleContactar = () => {
    // Lógica para contactar
    console.log('Contactar por vehículo:', vehiculo?.id);
    // Aquí podrías abrir un modal o redirigir a un formulario de contacto
  };

  const handleSolicitarPrueba = () => {
    // Lógica para solicitar prueba de manejo
    console.log('Solicitar prueba de manejo para:', vehiculo?.id);
  };

  const handleCompartir = () => {
    // Lógica para compartir
    if (navigator.share && vehiculo) {
      navigator.share({
        title: vehiculo.titulo,
        text: vehiculo.descripcion,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  if (error || !vehiculo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-8">El vehículo que buscas no existe o no está disponible.</p>
          <Link 
            href="/martillero" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Volver a vehículos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/martillero" className="text-gray-500 hover:text-gray-700">
                  Martillero
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900">{vehiculo.titulo}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen principal */}
          <div className="relative">
            <ImageCarousel 
              imagenes={vehiculo.imagenes || [vehiculo.imagen]} 
              titulo={vehiculo.titulo}
            />
            
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                {vehiculo.tipo}
              </span>
            </div>
          </div>

          {/* Información del vehículo */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{vehiculo.titulo}</h1>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {vehiculo.año}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {vehiculo.kilometraje.toLocaleString()} km
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8">{vehiculo.descripcion}</p>

                {/* Características principales */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehiculo.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Especificaciones técnicas */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificaciones técnicas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Marca:</span>
                        <span className="text-gray-900">{vehiculo.marca}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Modelo:</span>
                        <span className="text-gray-900">{vehiculo.modelo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Año:</span>
                        <span className="text-gray-900">{vehiculo.año}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Combustible:</span>
                        <span className="text-gray-900">{vehiculo.detalles.combustible}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Transmisión:</span>
                        <span className="text-gray-900">{vehiculo.detalles.transmision}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Motor:</span>
                        <span className="text-gray-900">{vehiculo.detalles.motor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Potencia:</span>
                        <span className="text-gray-900">{vehiculo.detalles.potencia}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Tracción:</span>
                        <span className="text-gray-900">{vehiculo.detalles.traccion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Color:</span>
                        <span className="text-gray-900">{vehiculo.detalles.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Kilometraje:</span>
                        <span className="text-gray-900">{vehiculo.kilometraje.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipamiento */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipamiento</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehiculo.detalles.equipamiento.map((equipo, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{equipo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel lateral */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${vehiculo.precio.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      Precio de venta
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleContactar}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Contactar por este vehículo
                    </button>
                    
                    <button 
                      onClick={handleSolicitarPrueba}
                      className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Solicitar prueba de manejo
                    </button>
                    
                    <button 
                      onClick={handleCompartir}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Compartir vehículo
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Información de contacto</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>+54 3547 570838</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>inmobiliariascotto@hotmail.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3">Servicios incluidos</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Asesoramiento legal
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Gestión de transferencia
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Verificación de documentos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link 
            href="/martillero" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a vehículos
          </Link>
        </div>
      </div>
    </div>
  );
}