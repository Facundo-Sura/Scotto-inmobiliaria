'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Datos de ejemplo para propiedades (mismo que en la página principal)
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
    imagen: 'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte',
    imagenes: [
      'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte+1',
      'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte+2',
      'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte+3',
      'https://placehold.co/600x400/red/white?text=Casa+en+Barrio+Norte+4'
    ],
    detalles: {
      superficie: '180 m²',
      terreno: '400 m²',
      antiguedad: '5 años',
      orientacion: 'Norte',
      estado: 'Excelente',
      servicios: ['Agua corriente', 'Gas natural', 'Electricidad', 'Cloacas', 'Internet'],
      ambientes: 6,
      cocheras: 2
    }
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
    imagen: 'https://placehold.co/600x400/red/white?text=Departamento+céntrico',
    imagenes: [
      'https://placehold.co/600x400/red/white?text=Departamento+céntrico+1',
      'https://placehold.co/600x400/red/white?text=Departamento+céntrico+2',
      'https://placehold.co/600x400/red/white?text=Departamento+céntrico+3'
    ],
    detalles: {
      superficie: '65 m²',
      terreno: 'N/A',
      antiguedad: '2 años',
      orientacion: 'Este',
      estado: 'Muy bueno',
      servicios: ['Agua corriente', 'Gas natural', 'Electricidad', 'Internet'],
      ambientes: 3,
      cocheras: 1
    }
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
    imagen: 'https://placehold.co/600x400/red/white?text=Terreno+residencial',
    imagenes: [
      'https://placehold.co/600x400/red/white?text=Terreno+residencial+1',
      'https://placehold.co/600x400/red/white?text=Terreno+residencial+2',
      'https://placehold.co/600x400/red/white?text=Terreno+residencial+3'
    ],
    detalles: {
      superficie: 'N/A',
      terreno: '500 m²',
      antiguedad: 'N/A',
      orientacion: 'Norte-Sur',
      estado: 'Disponible',
      servicios: ['Agua corriente', 'Gas natural', 'Electricidad', 'Cloacas'],
      ambientes: 0,
      cocheras: 0
    }
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
    imagen: 'https://placehold.co/600x400/red/white?text=Casa+alquiler',
    imagenes: [
      'https://placehold.co/600x400/red/white?text=Casa+alquiler+1',
      'https://placehold.co/600x400/red/white?text=Casa+alquiler+2',
      'https://placehold.co/600x400/red/white?text=Casa+alquiler+3'
    ],
    detalles: {
      superficie: '120 m²',
      terreno: '200 m²',
      antiguedad: '10 años',
      orientacion: 'Sur',
      estado: 'Bueno',
      servicios: ['Agua corriente', 'Gas natural', 'Electricidad', 'Cloacas'],
      ambientes: 4,
      cocheras: 1
    }
  }
];

// Definición de tipos para los parámetros de la página
type Params = {
  id: string;
}

export default function PropiedadDetailPage({ params }: { params: Params }) {
  const propiedadId = parseInt(params.id);
  const propiedad = PROPIEDADES_EJEMPLO.find(p => p.id === propiedadId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!propiedad) {
    notFound();
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (propiedad.imagenes?.length - 1) ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (propiedad.imagenes?.length - 1) : prevIndex - 1
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
                <Link href="/inmobiliaria" className="text-gray-500 hover:text-gray-700">
                  Inmobiliaria
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900">{propiedad.titulo}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Carrusel de imágenes */}
          <div className="relative h-96">
            <Image
              src={propiedad.imagenes?.[currentImageIndex] || propiedad.imagen}
              alt={`${propiedad.titulo} - Imagen ${currentImageIndex + 1}`}
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
              {propiedad.imagenes?.map((_, index) => (
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
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {propiedad.tipo === 'venta' ? 'Venta' : 'Alquiler'}
              </span>
            </div>
          </div>

          {/* Información de la propiedad */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Información principal */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{propiedad.titulo}</h1>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {propiedad.ubicacion}
                </div>

                <p className="text-gray-700 text-lg mb-8">{propiedad.descripcion}</p>

                {/* Características principales */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {propiedad.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detalles técnicos */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Superficie:</span>
                        <span className="text-gray-900">{propiedad.detalles.superficie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Terreno:</span>
                        <span className="text-gray-900">{propiedad.detalles.terreno}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Antigüedad:</span>
                        <span className="text-gray-900">{propiedad.detalles.antiguedad}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Orientación:</span>
                        <span className="text-gray-900">{propiedad.detalles.orientacion}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Estado:</span>
                        <span className="text-gray-900">{propiedad.detalles.estado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Ambientes:</span>
                        <span className="text-gray-900">{propiedad.detalles.ambientes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Cocheras:</span>
                        <span className="text-gray-900">{propiedad.detalles.cocheras}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servicios */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicios</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propiedad.detalles.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel lateral */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {propiedad.tipo === 'venta' 
                        ? `$${propiedad.precio.toLocaleString()}` 
                        : `$${propiedad.precio.toLocaleString()}/mes`}
                    </div>
                    <div className="text-gray-600">
                      {propiedad.tipo === 'venta' ? 'Precio de venta' : 'Precio mensual'}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                      Contactar por esta propiedad
                    </button>
                    
                    <button className="w-full bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 font-bold py-3 px-4 rounded-lg transition duration-300">
                      Solicitar visita
                    </button>
                    
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg transition duration-300">
                      Compartir propiedad
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
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link 
            href="/inmobiliaria" 
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}