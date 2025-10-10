'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipo para las subastas
type Subasta = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
};

// Datos de ejemplo para subastas
const subastasEjemplo: Subasta[] = [
  {
    id: 1,
    titulo: 'Casa en Country San Carlos',
    descripcion: 'Hermosa casa de 3 dormitorios con piscina y amplio jardín. Perfecta para familia.',
    imagen: '/data/subastas/casa-country.jpg',
    precioInicial: 150000,
    precioActual: 185000,
    fechaInicio: '2024-01-15',
    fechaFin: '2024-02-15',
    estado: 'activa',
    categoria: 'inmuebles',
    ofertas: 12
  },
  {
    id: 2,
    titulo: 'Toyota Hilux 2022',
    descripcion: 'Camioneta 4x4 en perfecto estado, full equipo, 25.000 km.',
    imagen: '/data/subastas/hilux-2022.jpg',
    precioInicial: 35000,
    precioActual: 42000,
    fechaInicio: '2024-01-20',
    fechaFin: '2024-02-05',
    estado: 'activa',
    categoria: 'vehiculos',
    ofertas: 8
  },
  {
    id: 3,
    titulo: 'Lote en Altos del Valle',
    descripcion: 'Terreno de 500m² con servicios, ideal para construcción.',
    imagen: '/data/subastas/lote-altos-valle.jpg',
    precioInicial: 45000,
    precioActual: 45000,
    fechaInicio: '2024-02-01',
    fechaFin: '2024-02-28',
    estado: 'proximamente',
    categoria: 'terrenos',
    ofertas: 0
  },
  {
    id: 4,
    titulo: 'Colección de Arte Moderno',
    descripcion: '5 obras de artistas contemporáneos nacionales.',
    imagen: '/data/subastas/arte-moderno.jpg',
    precioInicial: 8000,
    precioActual: 9500,
    fechaInicio: '2024-01-10',
    fechaFin: '2024-01-31',
    estado: 'activa',
    categoria: 'coleccionables',
    ofertas: 5
  }
];

export default function SubastasPage() {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [estadoFiltro, setEstadoFiltro] = useState('todas');

  useEffect(() => {
    // Aquí se cargarían las subastas reales desde una API
    setSubastas(subastasEjemplo);
  }, []);

  const subastasFiltradas = subastas.filter(subasta => {
    const cumpleCategoria = categoriaFiltro === 'todas' || subasta.categoria === categoriaFiltro;
    const cumpleEstado = estadoFiltro === 'todas' || subasta.estado === estadoFiltro;
    return cumpleCategoria && cumpleEstado;
  });

  const categorias = ['todas', 'inmuebles', 'vehiculos', 'terrenos', 'coleccionables'];
  const estados = ['todas', 'activa', 'proximamente', 'finalizada'];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-green-100 text-green-800';
      case 'proximamente': return 'bg-blue-100 text-blue-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Subastas Online
          </h1>
          <p className="text-xl mb-8">
            Oportunidades únicas en propiedades, vehículos y artículos exclusivos
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Ver Subastas Activas
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg transition duration-300">
              Cómo Participar
            </button>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría:</label>
              <select 
                value={categoriaFiltro} 
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'todas' ? 'Todas las categorías' : 
                     cat === 'inmuebles' ? 'Inmuebles' :
                     cat === 'vehiculos' ? 'Vehículos' :
                     cat === 'terrenos' ? 'Terrenos' : 'Coleccionables'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
              <select 
                value={estadoFiltro} 
                onChange={(e) => setEstadoFiltro(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {estados.map(estado => (
                  <option key={estado} value={estado}>
                    {estado === 'todas' ? 'Todos los estados' : 
                     estado === 'activa' ? 'Activas' :
                     estado === 'proximamente' ? 'Próximamente' : 'Finalizadas'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Listado de Subastas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Subastas Disponibles
          </h2>

          {subastasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay subastas que coincidan con los filtros seleccionados.</p>
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
                        {subasta.estado === 'activa' ? 'Activa' : 
                         subasta.estado === 'proximamente' ? 'Próximamente' : 'Finalizada'}
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
                        Finaliza: {new Date(subasta.fechaFin).toLocaleDateString('es-AR')}
                      </span>
                    </div>

                    {subasta.estado === 'activa' && (
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        Hacer Oferta
                      </button>
                    )}
                    
                    {subasta.estado === 'proximamente' && (
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        Ver Detalles
                      </button>
                    )}
                    
                    {subasta.estado === 'finalizada' && (
                      <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                        Ver Resultados
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de Información */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            ¿Cómo Funcionan Nuestras Subastas?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Registro</h3>
              <p className="text-gray-600">
                Regístrate como usuario y completa tu perfil para participar en las subastas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Oferta</h3>
              <p className="text-gray-600">
                Haz tu oferta durante el período activo de la subasta. Puedes mejorar tu oferta en cualquier momento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Adjudicación</h3>
              <p className="text-gray-600">
                Al finalizar la subasta, el mejor postor será contactado para completar la transacción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl mb-8">
            Regístrate ahora y comienza a participar en nuestras subastas exclusivas.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Crear Cuenta
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg transition duration-300">
              Contactar Asesor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}