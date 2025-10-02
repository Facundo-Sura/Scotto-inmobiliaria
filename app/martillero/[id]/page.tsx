'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Datos de ejemplo para vehículos (mismo que en la página principal)
const VEHICULOS_EJEMPLO = [
  {
    id: 1,
    titulo: 'Toyota Corolla 2019',
    descripcion: 'Excelente estado, único dueño, service oficial',
    precio: 15000,
    tipo: 'auto',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2019,
    kilometraje: 45000,
    caracteristicas: ['Motor 1.8', 'Automático', 'Nafta', 'Full', 'Climatizador'],
    imagen: 'https://placehold.co/600x400/blue/white?text=Toyota+Corolla',
    imagenes: [
      'https://placehold.co/600x400/blue/white?text=Toyota+Corolla+1',
      'https://placehold.co/600x400/blue/white?text=Toyota+Corolla+2',
      'https://placehold.co/600x400/blue/white?text=Toyota+Corolla+3',
      'https://placehold.co/600x400/blue/white?text=Toyota+Corolla+4'
    ],
    detalles: {
      combustible: 'Nafta',
      transmision: 'Automática',
      motor: '1.8L',
      cilindrada: '1800cc',
      potencia: '140 HP',
      traccion: 'Delantera',
      color: 'Blanco',
      puertas: 4,
      asientos: 5,
      equipamiento: ['Aire acondicionado', 'Dirección asistida', 'Cierre centralizado', 'Alarma', 'Radio CD', 'Llantas de aleación']
    }
  },
  {
    id: 2,
    titulo: 'Ford Ranger 2018',
    descripcion: 'Camioneta en perfecto estado, 4x4, diesel',
    precio: 25000,
    tipo: 'camioneta',
    marca: 'Ford',
    modelo: 'Ranger',
    año: 2018,
    kilometraje: 60000,
    caracteristicas: ['Motor 3.2', 'Manual', 'Diesel', '4x4', 'Cuero'],
    imagen: 'https://placehold.co/600x400/blue/white?text=Ford+Ranger',
    imagenes: [
      'https://placehold.co/600x400/blue/white?text=Ford+Ranger+1',
      'https://placehold.co/600x400/blue/white?text=Ford+Ranger+2',
      'https://placehold.co/600x400/blue/white?text=Ford+Ranger+3'
    ],
    detalles: {
      combustible: 'Diesel',
      transmision: 'Manual',
      motor: '3.2L',
      cilindrada: '3200cc',
      potencia: '200 HP',
      traccion: '4x4',
      color: 'Gris',
      puertas: 4,
      asientos: 5,
      equipamiento: ['Aire acondicionado', 'Dirección asistida', 'Asientos de cuero', 'Barra antivuelco', 'Lona marinera', 'Enganche']
    }
  },
  {
    id: 3,
    titulo: 'Volkswagen Gol 2020',
    descripcion: 'Económico, bajo consumo, ideal primer auto',
    precio: 10000,
    tipo: 'auto',
    marca: 'Volkswagen',
    modelo: 'Gol',
    año: 2020,
    kilometraje: 30000,
    caracteristicas: ['Motor 1.6', 'Manual', 'Nafta', 'Aire acondicionado'],
    imagen: 'https://placehold.co/600x400/blue/white?text=Volkswagen+Gol',
    imagenes: [
      'https://placehold.co/600x400/blue/white?text=Volkswagen+Gol+1',
      'https://placehold.co/600x400/blue/white?text=Volkswagen+Gol+2',
      'https://placehold.co/600x400/blue/white?text=Volkswagen+Gol+3'
    ],
    detalles: {
      combustible: 'Nafta',
      transmision: 'Manual',
      motor: '1.6L',
      cilindrada: '1600cc',
      potencia: '110 HP',
      traccion: 'Delantera',
      color: 'Rojo',
      puertas: 5,
      asientos: 5,
      equipamiento: ['Aire acondicionado', 'Dirección asistida', 'Cierre centralizado', 'Radio', 'Espejos eléctricos']
    }
  },
  {
    id: 4,
    titulo: 'Honda CB 190R 2021',
    descripcion: 'Moto deportiva en excelente estado',
    precio: 3000,
    tipo: 'moto',
    marca: 'Honda',
    modelo: 'CB 190R',
    año: 2021,
    kilometraje: 8000,
    caracteristicas: ['Motor 190cc', 'Manual', 'Nafta', 'Deportiva'],
    imagen: 'https://placehold.co/600x400/blue/white?text=Honda+CB190R',
    imagenes: [
      'https://placehold.co/600x400/blue/white?text=Honda+CB190R+1',
      'https://placehold.co/600x400/blue/white?text=Honda+CB190R+2',
      'https://placehold.co/600x400/blue/white?text=Honda+CB190R+3'
    ],
    detalles: {
      combustible: 'Nafta',
      transmision: 'Manual',
      motor: '190cc',
      cilindrada: '190cc',
      potencia: '17 HP',
      traccion: 'Trasera',
      color: 'Negro/Rojo',
      puertas: 0,
      asientos: 2,
      equipamiento: ['Frenos a disco', 'Tablero digital', 'Luces LED', 'Escape deportivo', 'Llantas de aleación']
    }
  }
];

interface VehiculoDetailPageProps {
  params: {
    id: string;
  };
}

export default function VehiculoDetailPage({ params }: VehiculoDetailPageProps) {
  const vehiculoId = parseInt(params.id);
  const vehiculo = VEHICULOS_EJEMPLO.find(v => v.id === vehiculoId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!vehiculo) {
    notFound();
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (vehiculo.imagenes?.length - 1) ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (vehiculo.imagenes?.length - 1) : prevIndex - 1
    );
  };
  
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/martillero" className="text-gray-500 hover:text-gray-700">
                  Martillero
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900">{vehiculo.titulo}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Imagen principal */}
          <div className="relative h-96">
            <Image
              src={vehiculo.imagenes?.[currentImageIndex] || vehiculo.imagen}
              alt={`${vehiculo.titulo} - Imagen ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            
            {/* Botones de navegación */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 focus:outline-none transition duration-300"
              aria-label="Imagen anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 focus:outline-none transition duration-300"
              aria-label="Imagen siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Indicadores */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {vehiculo.imagenes?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`h-2 w-2 rounded-full focus:outline-none transition-all duration-300 ${
                    currentImageIndex === index ? 'bg-white w-4' : 'bg-white bg-opacity-50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                {vehiculo.tipo}
              </span>
            </div>
          </div>

          {/* Información del vehículo */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{vehiculo.titulo}</h1>
                
                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {vehiculo.año}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {vehiculo.kilometraje.toLocaleString()} km
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-8">{vehiculo.descripcion}</p>

                {/* Características principales */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehiculo.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Especificaciones técnicas */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Especificaciones técnicas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Marca:</span>
                        <span className="text-gray-900">{vehiculo.marca}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Modelo:</span>
                        <span className="text-gray-900">{vehiculo.modelo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Año:</span>
                        <span className="text-gray-900">{vehiculo.año}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Combustible:</span>
                        <span className="text-gray-900">{vehiculo.detalles.combustible}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Transmisión:</span>
                        <span className="text-gray-900">{vehiculo.detalles.transmision}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Motor:</span>
                        <span className="text-gray-900">{vehiculo.detalles.motor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Potencia:</span>
                        <span className="text-gray-900">{vehiculo.detalles.potencia}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Tracción:</span>
                        <span className="text-gray-900">{vehiculo.detalles.traccion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Color:</span>
                        <span className="text-gray-900">{vehiculo.detalles.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Kilometraje:</span>
                        <span className="text-gray-900">{vehiculo.kilometraje.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipamiento */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Equipamiento</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehiculo.detalles.equipamiento.map((equipo, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{equipo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel lateral */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ${vehiculo.precio.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      Precio de venta
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                      Contactar por este vehículo
                    </button>
                    
                    <button className="w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-4 rounded-lg transition duration-300">
                      Solicitar prueba de manejo
                    </button>
                    
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300">
                      Compartir vehículo
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Información de contacto</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>+54 3547 570838</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>inmobiliariascotto@hotmail.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3">Servicios incluidos</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Asesoramiento legal
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Gestión de transferencia
                      </li>
                      <li className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Verificación de documentos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link 
            href="/martillero" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a vehículos
          </Link>
        </div>
      </div>
    </div>
  );
}