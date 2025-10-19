'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyFilters from './PropertyFilters';

// Tipo actualizado para las propiedades
type Propiedad = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: 'casa' | 'departamento' | 'terreno' | 'local';
  operacion: 'venta' | 'alquiler';
  direccion: string;
  habitaciones: number | null;
  metros: number | null;
  imagen: string | null;
  created_at: string;
  updated_at: string;
};

interface PropertyListProps {
  propiedades: Propiedad[];
}

export default function PropertyList({ propiedades }: PropertyListProps) {
  const [filters, setFilters] = useState({ tipo: 'todos', operacion: 'todos' });

  const propiedadesFiltradas = useMemo(() => {
    return propiedades.filter((propiedad) => {
      const tipoMatch = filters.tipo === 'todos' || propiedad.tipo === filters.tipo;
      const operacionMatch = filters.operacion === 'todos' || propiedad.operacion === filters.operacion;
      return tipoMatch && operacionMatch;
    });
  }, [propiedades, filters]);

  const handleFilterChange = (newFilters: { tipo: string; operacion: string }) => {
    setFilters(newFilters);
  };

  // Función para generar características basadas en los datos disponibles
  const generarCaracteristicas = (propiedad: Propiedad): string[] => {
    const caracteristicas: string[] = [];
    
    if (propiedad.habitaciones) {
      caracteristicas.push(`${propiedad.habitaciones} habitación${propiedad.habitaciones !== 1 ? 'es' : ''}`);
    }
    
    if (propiedad.metros) {
      caracteristicas.push(`${propiedad.metros} m²`);
    }
    
    if (caracteristicas.length === 0) {
      caracteristicas.push('Consultar características');
    }
    
    return caracteristicas;
  };

  // Función para obtener ubicación
  const getUbicacion = (propiedad: Propiedad): string => {
    return propiedad.direccion;
  };

  // Imagen por defecto
  const getImagenUrl = (imagen: string | null): string => {
    return imagen || '/default-property.jpg';
  };

  return (
    <>
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {/* Listado de propiedades */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Propiedades disponibles</h2>
          
          {propiedadesFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron propiedades con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {propiedadesFiltradas.map((propiedad) => {
                const caracteristicas = generarCaracteristicas(propiedad);
                const ubicacion = getUbicacion(propiedad);
                const imagenUrl = getImagenUrl(propiedad.imagen);
                
                return (
                  <div key={propiedad.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                    <div className="relative h-48">
                      <Image 
                        src={imagenUrl} 
                        alt={propiedad.titulo}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-property.jpg';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                          {propiedad.operacion === 'venta' ? 'Venta' : 'Alquiler'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{propiedad.titulo}</h3>
                      <p className="text-gray-600 mb-3 text-sm">{ubicacion}</p>
                      <p className="text-gray-700 mb-4 line-clamp-2">{propiedad.descripcion}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Características:</h4>
                        <ul className="grid grid-cols-2 gap-1">
                          {caracteristicas.map((caracteristica, index) => (
                            <li key={index} className="text-sm text-gray-600">• {caracteristica}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-red-600">
                          {propiedad.operacion === 'venta' 
                            ? `$${propiedad.precio.toLocaleString()}` 
                            : `$${propiedad.precio.toLocaleString()}/mes`}
                        </span>
                        <Link 
                          href={`/inmobiliaria/${propiedad.id}`} 
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}