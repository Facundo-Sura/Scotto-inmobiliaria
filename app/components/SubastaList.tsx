'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SubastaFilters from './SubastaFilters';

// Tipo para las subastas
interface Subasta {
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
}

interface SubastaListProps {
  subastas: Subasta[];
}

export default function SubastaList({ subastas }: SubastaListProps) {
  const [filters, setFilters] = useState({ categoria: 'todas', estado: 'todas' });

  const subastasFiltradas = useMemo(() => {
    return subastas.filter((subasta) => {
      const categoriaMatch = filters.categoria === 'todas' || subasta.categoria === filters.categoria;
      const estadoMatch = filters.estado === 'todas' || subasta.estado === filters.estado;
      return categoriaMatch && estadoMatch;
    });
  }, [subastas, filters]);

  const handleFilterChange = (newFilters: { categoria: string; estado: string }) => {
    setFilters(newFilters);
  };

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
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  return (
    <>
      <SubastaFilters onFilterChange={handleFilterChange} />
      
      {/* Listado de subastas */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Subastas Disponibles</h2>
          
          {subastasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron subastas con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subastasFiltradas.map((subasta) => (
                <div key={subasta.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="relative h-48">
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
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(subasta.estado)}`}>
                        {getEstadoTexto(subasta.estado)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{subasta.titulo}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{subasta.descripcion}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Precio inicial</p>
                        <p className="font-semibold text-gray-700">{formatearPrecio(subasta.precioInicial)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Precio actual</p>
                        <p className="font-semibold text-green-600">{formatearPrecio(subasta.precioActual)}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {subasta.ofertas} oferta{subasta.ofertas !== 1 ? 's' : ''}
                      </span>
                      <span className="text-sm text-gray-500">
                        Finaliza: {formatearFecha(subasta.fechaFin)}
                      </span>
                    </div>

                    {subasta.estado === 'activa' && (
                      <Link 
                        href={`/subastas/${subasta.id}`}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 block text-center"
                      >
                        Hacer Oferta
                      </Link>
                    )}
                    
                    {subasta.estado === 'proximamente' && (
                      <Link 
                        href={`/subastas/${subasta.id}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 block text-center"
                      >
                        Ver Detalles
                      </Link>
                    )}
                    
                    {subasta.estado === 'finalizada' && (
                      <Link 
                        href={`/subastas/${subasta.id}`}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 block text-center"
                      >
                        Ver Resultados
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}