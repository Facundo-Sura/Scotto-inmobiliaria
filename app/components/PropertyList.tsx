'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropertyFilters from './PropertyFilters';

// Tipo para las propiedades
type Propiedad = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  categoria: string;
  ubicacion: string;
  caracteristicas: string[];
  imagen: string;
};

interface PropertyListProps {
  propiedades: Propiedad[];
}

export default function PropertyList({ propiedades }: PropertyListProps) {
  const [filters, setFilters] = useState({ tipo: 'todos', categoria: 'todos' });

  const propiedadesFiltradas = useMemo(() => {
    return propiedades.filter((propiedad) => {
      const tipoMatch = filters.tipo === 'todos' || propiedad.tipo === filters.tipo;
      const categoriaMatch = filters.categoria === 'todos' || propiedad.categoria === filters.categoria;
      return tipoMatch && categoriaMatch;
    });
  }, [propiedades, filters]);

  const handleFilterChange = (newFilters: { tipo: string; categoria: string }) => {
    setFilters(newFilters);
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
              {propiedadesFiltradas.map((propiedad) => (
                <div key={propiedad.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image 
                    src={propiedad.imagen} 
                    alt={propiedad.titulo}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{propiedad.titulo}</h3>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                        {propiedad.tipo === 'venta' ? 'Venta' : 'Alquiler'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{propiedad.ubicacion}</p>
                    <p className="text-gray-700 mb-4">{propiedad.descripcion}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Características:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {propiedad.caracteristicas.map((caracteristica, index) => (
                          <li key={index} className="text-sm text-gray-600">• {caracteristica}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-red-600">
                        {propiedad.tipo === 'venta' 
                          ? `$${propiedad.precio.toLocaleString()}` 
                          : `$${propiedad.precio.toLocaleString()}/mes`}
                      </span>
                      <Link href={`/inmobiliaria/${propiedad.id}`} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Ver detalles
                      </Link>
                    </div>
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