'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PropiedadDetalle, VehiculoDetalle, ItemTipo } from '../types';
import WhatsAppButton from './whatsappButton';

interface DetailProps {
  item: PropiedadDetalle | VehiculoDetalle;
  itemType: ItemTipo;
}

export default function Detail({ item, itemType }: DetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isPropiedad = itemType === 'propiedad';
  const propiedad = isPropiedad ? item as PropiedadDetalle : null;
  const vehiculo = !isPropiedad ? item as VehiculoDetalle : null;

  const images = item.imagenes || [item.imagen];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = () => {
    if (isPropiedad) {
      return item.tipo === 'venta' 
        ? `$${item.precio.toLocaleString()}` 
        : `$${item.precio.toLocaleString()}/mes`;
    } else {
      return `$${item.precio.toLocaleString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href={isPropiedad ? '/inmobiliaria' : '/martillero'} 
            className="text-blue-600 hover:text-blue-800"
          >
            ← Volver a {isPropiedad ? 'Inmobiliaria' : 'Martillero'}
          </Link>
        </nav>

        {/* Contenido principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Galería de imágenes */}
          <div className="relative">
            <Image
              src={images[currentImageIndex]}
              alt={item.titulo}
              width={800}
              height={400}
              className="w-full h-96 object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  →
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Información del item */}
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Información principal */}
              <div className="lg:w-2/3">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{item.titulo}</h1>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    isPropiedad 
                      ? item.tipo === 'venta' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {isPropiedad ? (item.tipo === 'venta' ? 'Venta' : 'Alquiler') : item.tipo}
                  </span>
                </div>

                <p className="text-xl font-bold text-blue-600 mb-4">
                  {formatPrice()}
                </p>

                {isPropiedad && propiedad?.ubicacion && (
                  <p className="text-gray-600 mb-6">
                    📍 {propiedad.ubicacion}
                  </p>
                )}

                {!isPropiedad && vehiculo && (
                  <div className="flex gap-6 text-gray-600 mb-6">
                    <span>🚗 {vehiculo.marca} {vehiculo.modelo}</span>
                    <span>📅 {vehiculo.año}</span>
                    <span>🛣️ {vehiculo.kilometraje.toLocaleString()} km</span>
                  </div>
                )}

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {item.descripcion}
                </p>

                {/* Características */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Características</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.caracteristicas.map((caracteristica, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{caracteristica}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detalles específicos */}
                {item.detalles && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {isPropiedad ? 'Detalles de la propiedad' : 'Especificaciones técnicas'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(item.detalles).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded">
                          <span className="block text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="block text-lg font-semibold">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar con botón de WhatsApp */}
              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                  <h3 className="text-xl font-semibold mb-4">¿Te interesa este {isPropiedad ? 'propiedad' : 'vehículo'}?</h3>
                  <p className="text-gray-600 mb-6">
                    Contáctanos para más información o para agendar una visita
                  </p>
                  
                  <WhatsAppButton
                    itemTitulo={item.titulo}
                    itemTipo={itemType}
                    className="w-full justify-center py-4 text-lg"
                  />
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      También puedes contactarnos al:
                    </p>
                    <p className="text-lg font-semibold">+54 9 3547 57-0838</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

