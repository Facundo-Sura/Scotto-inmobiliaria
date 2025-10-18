'use client';

import React, { useState } from 'react';

interface SubastaFiltersProps {
  onFilterChange: (filters: { categoria: string; estado: string }) => void;
}

export default function SubastaFilters({ onFilterChange }: SubastaFiltersProps) {
  const [categoria, setCategoria] = useState('todas');
  const [estado, setEstado] = useState('todas');

  const handleCategoriaChange = (newCategoria: string) => {
    setCategoria(newCategoria);
    onFilterChange({ categoria: newCategoria, estado });
  };

  const handleEstadoChange = (newEstado: string) => {
    setEstado(newEstado);
    onFilterChange({ categoria, estado: newEstado });
  };

  return (
    <section className="py-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría:
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="todas">Todas las categorías</option>
              <option value="inmuebles">Inmuebles</option>
              <option value="vehiculos">Vehículos</option>
              <option value="terrenos">Terrenos</option>
              <option value="coleccionables">Coleccionables</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
              Estado:
            </label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => handleEstadoChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="todas">Todos los estados</option>
              <option value="activa">Activas</option>
              <option value="proximamente">Próximamente</option>
              <option value="finalizada">Finalizadas</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}