'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Datos de ejemplo para propiedades
const PROPIEDADES_EJEMPLO = [
  {
    id: 1,
    titulo: 'Casa en Barrio Norte',
    descripcion: 'Hermosa casa de 3 dormitorios con jardín y piscina',
    precio: 150000,
    tipo: 'venta',
    categoria: 'casa',
    ubicacion: 'Alta Gracia, Córdoba',
    caracteristicas: ['3 dormitorios', '2 baños', 'Jardín', 'Piscina', 'Garage'],
    imagen: 'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte'
  },
  {
    id: 2,
    titulo: 'Departamento céntrico',
    descripcion: 'Moderno departamento de 2 dormitorios en el centro de la ciudad',
    precio: 80000,
    tipo: 'venta',
    categoria: 'departamento',
    ubicacion: 'Alta Gracia, Córdoba',
    caracteristicas: ['2 dormitorios', '1 baño', 'Balcón', 'Cocina integrada'],
    imagen: 'https://placehold.co/600x400/red/white?text=Departamento+céntrico'
  },
  {
    id: 3,
    titulo: 'Terreno en zona residencial',
    descripcion: 'Amplio terreno de 500m² en zona residencial',
    precio: 50000,
    tipo: 'venta',
    categoria: 'terreno',
    ubicacion: 'Alta Gracia, Córdoba',
    caracteristicas: ['500m²', 'Servicios disponibles', 'Zona residencial'],
    imagen: 'https://placehold.co/600x400/red/white?text=Terreno+residencial'
  },
  {
    id: 4,
    titulo: 'Casa para alquiler',
    descripcion: 'Casa de 2 dormitorios disponible para alquiler',
    precio: 500,
    tipo: 'alquiler',
    categoria: 'casa',
    ubicacion: 'Alta Gracia, Córdoba',
    caracteristicas: ['2 dormitorios', '1 baño', 'Patio', 'Cocina equipada'],
    imagen: 'https://placehold.co/600x400/red/white?text=Casa+alquiler'
  }
];

export default function InmobiliariaPage() {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  
  // Filtrar propiedades según los filtros seleccionados
  const propiedadesFiltradas = PROPIEDADES_EJEMPLO.filter(propiedad => {
    const cumpleTipo = filtroTipo === 'todos' || propiedad.tipo === filtroTipo;
    const cumpleCategoria = filtroCategoria === 'todos' || propiedad.categoria === filtroCategoria;
    return cumpleTipo && cumpleCategoria;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Inmobiliaria Scotto</h1>
          <p className="text-xl mb-8">
            Encuentra la propiedad de tus sueños en Alta Gracia y alrededores
          </p>
        </div>
      </section>
      
      {/* Filtros */}
      <section className="py-8 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de operación
              </label>
              <select
                id="tipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
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
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
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
                      <Link href={`/inmobiliaria/propiedad/${propiedad.id}`} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
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
      
      {/* Sección de contacto */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿No encuentras lo que buscas?</h2>
          <p className="text-xl mb-8">
            Contáctanos y te ayudaremos a encontrar la propiedad perfecta para ti.
          </p>
          <Link href="/contacto" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}