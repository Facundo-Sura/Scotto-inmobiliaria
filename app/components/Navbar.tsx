'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Determinar en qué sección estamos
  const isRealEstate = pathname.startsWith('/inmobiliaria') || pathname === '/';
  const isAuctions = pathname.startsWith('/subastas');
  
  // Colores según la sección
  let primaryColor;
  let hoverColor;

  if (isRealEstate) {
    primaryColor = 'text-red-600';
    hoverColor = 'hover:bg-red-300';
  } else if (isAuctions) {
    primaryColor = 'text-green-600';
    hoverColor = 'hover:bg-green-300';
  } else {
    primaryColor = 'text-blue-600';
    hoverColor = 'hover:bg-blue-300';
  }
  
  return (
    <nav className={`${primaryColor} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </Link>
          </div>
          
          {/* Menú para pantallas medianas y grandes */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-gray-300' : hoverColor}`}>
              Inicio
            </Link>
            <Link href="/inmobiliaria" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/inmobiliaria' ? 'bg-red-300' : hoverColor}`}>
              Inmobiliaria
            </Link>
            <Link href="/martillero" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/martillero' ? 'bg-blue-300' : hoverColor}`}>
              Martillero
            </Link>
            <Link href="/subastas" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/subastas' ? 'bg-green-300' : hoverColor}`}>
              Subastas
            </Link>
            <Link href="/acerca-de-mi" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/acerca-de-mi' ? 'bg-gray-300' : hoverColor}`}>
              Acerca de mí
            </Link>
          </div>
          
          {/* Botón de menú para móviles */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={` inline-flex items-center justify-center p-2 rounded-md ${hoverColor} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de menú */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icono de cerrar */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/' ? 'bg-gray-400' : hoverColor}`}>
            Inicio
          </Link>
          <Link href="/inmobiliaria" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/inmobiliaria' ? 'bg-red-400' : hoverColor}`}>
            Inmobiliaria
          </Link>
          <Link href="/martillero" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/martillero' ? 'bg-blue-400' : hoverColor}`}>
            Martillero
          </Link>
          <Link href="/subastas" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/subastas' ? 'bg-green-400' : hoverColor}`}>
            Subastas
          </Link>
          <Link href="/acerca-de-mi" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/acerca-de-mi' ? 'bg-gray-400' : hoverColor}`}>
            Acerca de mí
          </Link>
        </div>
      </div>
    </nav>
  );
}