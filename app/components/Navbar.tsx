'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Determinar si estamos en la sección inmobiliaria o martillero
  const isRealEstate = pathname.startsWith('/inmobiliaria') || pathname === '/';
  
  // Colores según la sección
  const primaryColor = isRealEstate ? 'text-red-600' : 'text-blue-600';
  const hoverColor = isRealEstate ? 'hover:bg-red-300' : 'hover:bg-blue-300';
  
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
            <Link href="/" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-black' : hoverColor}`}>
              Inicio
            </Link>
            <Link href="/inmobiliaria" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/inmobiliaria' ? 'bg-black' : hoverColor}`}>
              Inmobiliaria
            </Link>
            <Link href="/martillero" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/martillero' ? 'bg-black' : hoverColor}`}>
              Martillero
            </Link>
            <Link href="/acerca-de-mi" className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/acerca-de-mi' ? 'bg-black' : hoverColor}`}>
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
          <Link href="/" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/' ? 'bg-black' : hoverColor}`}>
            Inicio
          </Link>
          <Link href="/inmobiliaria" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/inmobiliaria' ? 'bg-black' : hoverColor}`}>
            Inmobiliaria
          </Link>
          <Link href="/martillero" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/martillero' ? 'bg-black' : hoverColor}`}>
            Martillero
          </Link>
          <Link href="/acerca-de-mi" className={` block px-3 py-2 rounded-md text-base font-medium ${pathname === '/acerca-de-mi' ? 'bg-black' : hoverColor}`}>
            Acerca de mí
          </Link>
        </div>
      </div>
    </nav>
  );
}