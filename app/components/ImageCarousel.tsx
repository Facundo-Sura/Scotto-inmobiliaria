'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  imagenes: string[];
  titulo?: string;
}

export default function ImageCarousel({ imagenes, titulo }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full h-96 mb-6">
      <div className="relative w-full h-full">
        <Image
          src={imagenes[currentImageIndex]}
          alt={`${titulo || ''} - Imagen ${currentImageIndex + 1}`}
          fill
          className="object-cover rounded-lg"
        />
       </div>
       
       {/* Botones de navegación */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Imagen anterior"
      >
        &#10094;
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Siguiente imagen"
      >
        &#10095;
      </button>
      
      {/* Indicadores de imagen */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}