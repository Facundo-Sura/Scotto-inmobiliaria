'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ImageCarousel from '../../components/ImageCarousel';
import Link from 'next/link';

// Tipo para las subastas detalladas
interface SubastaDetalle {
  id: string;
  titulo: string;
  descripcion: string;
  precioInicial: number;
  precioActual: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
  imagen: string;
  imagenes?: string[];
  ubicacion?: string;
  caracteristicas?: string[];
  detalles?: {
    superficie?: string;
    terreno?: string;
    antiguedad?: string;
    orientacion?: string;
    estadoConservacion?: string;
    servicios?: string[];
    ambientes?: number;
    cocheras?: number;
    combustible?: string;
    transmision?: string;
    color?: string;
    puertas?: number;
    motor?: string;
    cilindrada?: string;
    kilometraje?: number;
  };
}

export default function SubastaDetallePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [subasta, setSubasta] = useState<SubastaDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubasta = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const response = await fetch(`${apiUrl}/subastas/${id}`);
        
        if (!response.ok) {
          throw new Error('Subasta no encontrada');
        }
        
        const data = await response.json();
        setSubasta(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la subasta');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubasta();
    }
  }, [id]);

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-green-100 text-green-800';
      case 'proximamente': return 'bg-blue-100 text-blue-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado: string) => {
    switch (estado) {
      case 'activa': return 'Activa';
      case 'proximamente': return 'Próximamente';
      case 'finalizada': return 'Finalizada';
      default: return estado;
    }
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTiempoRestante = (fechaFin: string) => {
    const ahora = new Date();
    const fin = new Date(fechaFin);
    const diferencia = fin.getTime() - ahora.getTime();
    
    if (diferencia <= 0) return 'Finalizada';
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${dias}d ${horas}h ${minutos}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando subasta...</p>
        </div>
      </div>
    );
  }

  if (error || !subasta) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <p className="font-semibold">Error</p>
            <p>{error || 'Subasta no encontrada'}</p>
          </div>
          <Link 
            href="/subastas" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Volver a Subastas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">Inicio</Link>
            <span>/</span>
            <Link href="/subastas" className="hover:text-green-600">Subastas</Link>
            <span>/</span>
            <span className="text-gray-900">{subasta.titulo}</span>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(subasta.estado)} mb-4`}>
                {getEstadoTexto(subasta.estado)}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{subasta.titulo}</h1>
              {subasta.ubicacion && (
                <p className="text-gray-600 mb-4">{subasta.ubicacion}</p>
              )}
            </div>
            
            <div className="lg:text-right mt-4 lg:mt-0">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatearPrecio(subasta.precioActual)}
              </div>
              <p className="text-sm text-gray-500">Precio actual</p>
              <p className="text-sm text-gray-500">
                Precio inicial: {formatearPrecio(subasta.precioInicial)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Imagen y detalles */}
          <div className="lg:col-span-2">
            {/* Imagen principal */}
            {/* ✅ REEMPLAZAR Imagen principal por ImageCarousel */}
            {subasta.imagenes && subasta.imagenes.length > 1 ? (
              <ImageCarousel 
                imagenes={subasta.imagenes} 
                titulo={subasta.titulo}
              />
            ) : (
              // Si solo hay una imagen, mostrar normalmente
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-96">
                  <Image
                    src={subasta.imagen}
                    alt={subasta.titulo}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/logo.png';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Descripción */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p className="text-gray-700 leading-relaxed">{subasta.descripcion}</p>
            </div>

            {/* Características */}
            {subasta.caracteristicas && subasta.caracteristicas.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subasta.caracteristicas.map((caracteristica, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm text-gray-700">{caracteristica}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detalles específicos */}
            {subasta.detalles && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Detalles Técnicos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(subasta.detalles).map(([key, value]) => {
                    if (value === null || value === undefined || value === '') return null;
                    
                    const label = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())
                      .replace('Estado Conservacion', 'Estado de Conservación');
                    
                    return (
                      <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-medium">{label}:</span>
                        <span className="text-gray-900">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Información de la subasta */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Información de la Subasta</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="font-semibold">{getEstadoTexto(subasta.estado)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Ofertas realizadas</p>
                  <p className="font-semibold">{subasta.ofertas}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Inició</p>
                  <p className="font-semibold">{formatearFecha(subasta.fechaInicio)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Finaliza</p>
                  <p className="font-semibold">{formatearFecha(subasta.fechaFin)}</p>
                </div>
                
                {subasta.estado === 'activa' && (
                  <div>
                    <p className="text-sm text-gray-500">Tiempo restante</p>
                    <p className="font-semibold text-green-600">{getTiempoRestante(subasta.fechaFin)}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Precio actual</p>
                  <p className="text-2xl font-bold text-green-600">{formatearPrecio(subasta.precioActual)}</p>
                  <p className="text-sm text-gray-500">Precio inicial: {formatearPrecio(subasta.precioInicial)}</p>
                </div>
                
                {subasta.estado === 'activa' && (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4">
                    Hacer Oferta
                  </button>
                )}
                
                {subasta.estado === 'proximamente' && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4">
                    Programar Recordatorio
                  </button>
                )}
                
                {subasta.estado === 'finalizada' && (
                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 mt-4">
                    Ver Resultados
                  </button>
                )}
                
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <p className="text-sm text-gray-500 mb-2">¿Tienes dudas?</p>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded transition duration-300">
                    Contactar Asesor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}