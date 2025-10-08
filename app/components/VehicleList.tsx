'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VehicleFilters from './VehicleFilters';

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
};

interface VehicleListProps {
  vehiculos: Vehiculo[];
}

export default function VehicleList({ vehiculos }: VehicleListProps) {
  const [filters, setFilters] = useState({ tipo: 'todos', marca: 'todos' });

  const vehiculosFiltrados = useMemo(() => {
    return vehiculos.filter((vehiculo) => {
      const tipoMatch = filters.tipo === 'todos' || vehiculo.tipo === filters.tipo;
      const marcaMatch = filters.marca === 'todos' || vehiculo.marca === filters.marca;
      return tipoMatch && marcaMatch;
    });
  }, [vehiculos, filters]);

  const handleFilterChange = (newFilters: { tipo: string; marca: string }) => {
    setFilters(newFilters);
  };

  return (
    <>
      <VehicleFilters onFilterChange={handleFilterChange} />
      
      {/* Listado de vehículos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Vehículos disponibles</h2>
          
          {vehiculosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron vehículos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehiculosFiltrados.map((vehiculo) => (
                <div key={vehiculo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image 
                    src={vehiculo.imagen} 
                    alt={vehiculo.titulo}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{vehiculo.titulo}</h3>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        {vehiculo.tipo}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span>{vehiculo.año}</span>
                      <span>{vehiculo.kilometraje.toLocaleString()} km</span>
                    </div>
                    <p className="text-gray-700 mb-4">{vehiculo.descripcion}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Características:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {vehiculo.caracteristicas.map((caracteristica, index) => (
                          <li key={index} className="text-sm text-gray-600">• {caracteristica}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        ${vehiculo.precio.toLocaleString()}
                      </span>
                      <Link href={`/martillero/${vehiculo.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
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