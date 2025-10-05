"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from '../../../components/ImageCarousel';

// Tipo para las propiedades
interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  categoria: string;
  ubicacion: string;
  caracteristicas: string[];
  imagen: string;
  imagenes: string[];
  detalles: {
    superficie: string;
    terreno: string;
    antiguedad: string;
    orientacion: string;
    estado: string;
    servicios: string[];
    ambientes: number;
    cocheras: number;
  };
}

interface PropiedadDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropiedadDetailPage({ params }: PropiedadDetailPageProps) {
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    
    const fetchPropiedad = async () => {
      try {
        const propiedadId = parseInt(resolvedParams.id);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/data/propiedades.json`);
        
        if (!res.ok) {
          throw new Error('Error al cargar los datos');
        }
        
        const data = await res.json();
        const propiedadEncontrada = data.propiedades.find((p: Propiedad) => p.id === propiedadId);
        
        if (!propiedadEncontrada) {
          setError('Propiedad no encontrada');
          return;
        }
        
        setPropiedad(propiedadEncontrada);
      } catch (err) {
        console.error('Error al cargar los datos de propiedades:', err);
        setError('Error al cargar la propiedad');
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedad();
  }, [resolvedParams?.id]);

  const handleContactar = () => {
    // Lógica para contactar
    console.log('Contactar por propiedad:', propiedad?.id);
  };

  const handleSolicitarVisita = () => {
    // Lógica para solicitar visita
    console.log('Solicitar visita para propiedad:', propiedad?.id);
  };

  const handleCompartir = () => {
    // Lógica para compartir
    if (navigator.share && propiedad) {
      navigator.share({
        title: propiedad.titulo,
        text: propiedad.descripcion,
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (error || !propiedad) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h2>
          <p className="text-gray-600 mb-8">La propiedad que buscas no existe o no está disponible.</p>
          <Link 
            href="/inmobiliaria" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Volver a propiedades
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
                <Link href="/inmobiliaria" className="text-gray-500 hover:text-gray-700">
                  Inmobiliaria
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900">{propiedad.titulo}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Carrusel de imágenes */}
          <div className="relative">
            <ImageCarousel 
              imagenes={propiedad.imagenes || [propiedad.imagen]} 
              titulo={propiedad.titulo}
            />
            
            <div className="absolute top-4 right-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {propiedad.tipo === 'venta' ? 'Venta' : 'Alquiler'}
              </span>
            </div>
          </div>

          {/* Información de la propiedad */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{propiedad.titulo}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {propiedad.ubicacion}
                </div>

                <p className="text-gray-700 text-lg mb-8">{propiedad.descripcion}</p>

                {/* Características principales */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {propiedad.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detalles técnicos */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Superficie:</span>
                        <span className="text-gray-900">{propiedad.detalles.superficie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Terreno:</span>
                        <span className="text-gray-900">{propiedad.detalles.terreno}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Antigüedad:</span>
                        <span className="text-gray-900">{propiedad.detalles.antiguedad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Orientación:</span>
                        <span className="text-gray-900">{propiedad.detalles.orientacion}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Estado:</span>
                        <span className="text-gray-900">{propiedad.detalles.estado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Ambientes:</span>
                        <span className="text-gray-900">{propiedad.detalles.ambientes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Cocheras:</span>
                        <span className="text-gray-900">{propiedad.detalles.cocheras}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicios */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicios</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propiedad.detalles.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel lateral */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {propiedad.tipo === 'venta' 
                        ? `$${propiedad.precio.toLocaleString()}` 
                        : `$${propiedad.precio.toLocaleString()}/mes`}
                    </div>
                    <div className="text-gray-600">
                      {propiedad.tipo === 'venta' ? 'Precio de venta' : 'Precio mensual'}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleContactar}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Contactar por esta propiedad
                    </button>
                    
                    <button 
                      onClick={handleSolicitarVisita}
                      className="w-full bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Solicitar visita
                    </button>
                    
                    <button 
                      onClick={handleCompartir}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300"
                    >
                      Compartir propiedad
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link 
            href="/inmobiliaria" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}