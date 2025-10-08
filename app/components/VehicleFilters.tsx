'use client';

import React, { useState } from 'react';

interface VehicleFiltersProps {
  onFilterChange: (filters: { tipo: string; marca: string }) => void;
}

export default function VehicleFilters({ onFilterChange }: VehicleFiltersProps) {
  const [tipo, setTipo] = useState('todos');
  const [marca, setMarca] = useState('todos');

  const handleTipoChange = (newTipo: string) => {
    setTipo(newTipo);
    onFilterChange({ tipo: newTipo, marca });
  };

  const handleMarcaChange = (newMarca: string) => {
    setMarca(newMarca);
    onFilterChange({ tipo, marca: newMarca });
  };

  return (
    <section className="py-8 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de vehículo
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => handleTipoChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="todos">Todos</option>
              <option value="auto">Auto</option>
              <option value="camioneta">Camioneta</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <select
              id="marca"
              value={marca}
              onChange={(e) => handleMarcaChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="todos">Todas</option>
              <option value="Toyota">Toyota</option>
              <option value="Ford">Ford</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Honda">Honda</option>
              <option value="Fiat">Fiat</option>
              <option value="Renault">Renault</option>
              <option value="Peugeot">Peugeot</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}