'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const pathname = usePathname();
  
  // Determinar en qué sección estamos
  const isRealEstate = pathname.startsWith('/inmobiliaria') || pathname === '/';
  const isAuctions = pathname.startsWith('/subastas');
  
  // Colores según la sección
  let primaryColor;
  if (isRealEstate) {
    primaryColor = 'bg-red-600';
  } else if (isAuctions) {
    primaryColor = 'bg-green-600';
  } else {
    primaryColor = 'bg-blue-600';
  }
  const textColor = 'text-white';
  
  return (
    <footer className={`${primaryColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isRealEstate ? 'Inmobiliaria Scotto' : isAuctions ? 'Subastas Scotto' : 'Martillero Eduardo Raul Scotto'}
            </h3>
            <p className="text-sm">
              Servicios profesionales en Alta Gracia, Córdoba - Argentina
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/inmobiliaria" className="text-sm hover:underline">
                  Inmobiliaria
                </Link>
              </li>
              <li>
                <Link href="/martillero" className="text-sm hover:underline">
                  Martillero
                </Link>
              </li>
              <li>
                <Link href="/subastas" className="text-sm hover:underline">
                  Subastas
                </Link>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="text-sm hover:underline">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-sm hover:underline">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/acerca-de-mi" className="text-sm hover:underline">
                  Acerca de mí
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-sm">
              <p>Alta Gracia, Córdoba</p>
              <p>Argentina</p>
              <p className="mt-2">Email: inmobiliariascotto@hotmail.com</p>
              <p>Teléfono: +54 3547 570838</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Eduardo Raul Scotto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}