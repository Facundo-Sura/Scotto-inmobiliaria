'use client';

import React, { useState } from 'react';

interface PropertyFiltersProps {
  onFilterChange: (filters: { tipo: string; categoria: string }) => void;
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [tipo, setTipo] = useState('todos');
  const [categoria, setCategoria] = useState('todos');

  const handleTipoChange = (newTipo: string) => {
    setTipo(newTipo);
    onFilterChange({ tipo: newTipo, categoria });
  };

  const handleCategoriaChange = (newCategoria: string) => {
    setCategoria(newCategoria);
    onFilterChange({ tipo, categoria: newCategoria });
  };

  return (
    <section className="py-8 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de operación
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => handleTipoChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="todos">Todos</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de propiedad
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="todos">Todos</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="local">Local comercial</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}