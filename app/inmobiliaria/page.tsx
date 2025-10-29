import React from "react";
import Link from "next/link";
import PropertyList from "../components/PropertyList";
import type { Metadata } from "next";

// Tipo actualizado para las propiedades según la base de datos
type Propiedad = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: 'casa' | 'departamento' | 'terreno' | 'local';
  operacion: 'venta' | 'alquiler';
  direccion: string;
  habitaciones: number | null;
  metros: number | null;
  imagen: string | null;
  created_at: string;
  updated_at: string;
};

// Metadata específica para la página principal
export const metadata: Metadata = {
  title: "Inmobiliaria Scotto | Propiedades en Venta y Alquiler en Alta Gracia",
  description: "Inmobiliaria Scotto en Alta Gracia, Córdoba. Encuentra casas, departamentos, terrenos y locales en venta y alquiler. Tu propiedad ideal te espera.",
  keywords: "inmobiliaria scotto, propiedades alta gracia, casas en venta alta gracia, alquiler alta gracia, departamentos alta gracia, terrenos alta gracia, inmobiliaria córdoba",
  openGraph: {
    title: "Inmobiliaria Scotto | Propiedades en Alta Gracia",
    description: "Encuentra tu propiedad ideal en Alta Gracia con Inmobiliaria Scotto",
    url: "https://scotto-inmobiliaria.com",
    siteName: "Inmobiliaria Scotto",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Inmobiliaria Scotto - Propiedades en Alta Gracia",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
};

// Función para obtener las propiedades desde el backend
async function getPropiedades(): Promise<Propiedad[]> {
  try {
    const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/inmobiliaria', {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los datos de propiedades:", error);
    return [];
  }
}

export default async function InmobiliariaPage() {
  // Obtener las propiedades desde la API
  const propiedades = await getPropiedades();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Optimizada para SEO */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Inmobiliaria Scotto - Tu Hogar en Alta Gracia
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Especialistas en <strong>propiedades en Alta Gracia</strong>. Encuentra casas, departamentos y terrenos en venta y alquiler.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-3">
              ¿Buscas <strong>inmobiliaria en Alta Gracia</strong>?
            </h2>
            <p className="text-lg">
              En <strong>Inmobiliaria Scotto</strong> tenemos las mejores opciones de propiedades en Alta Gracia y zona. Asesoramiento profesional y personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Propiedades Destacadas */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Propiedades Destacadas en Alta Gracia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra selección de <strong>casas, departamentos y terrenos en Alta Gracia</strong>. 
              {propiedades.length > 0 ? ` Actualmente tenemos ${propiedades.length} propiedades disponibles.` : ' Contamos con las mejores opciones del mercado.'}
            </p>
          </div>
          
          {/* Componente de filtros y listado de propiedades */}
          <PropertyList propiedades={propiedades} />
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicios de Inmobiliaria Scotto en Alta Gracia
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3">Compra y Venta</h3>
              <p className="text-gray-600">
                Encuentra tu propiedad ideal en <strong>Alta Gracia</strong> o vende tu inmueble al mejor precio.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3">Alquileres</h3>
              <p className="text-gray-600">
                Amplia variedad de propiedades en alquiler en <strong>Alta Gracia</strong> y zona.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-3">Asesoramiento</h3>
              <p className="text-gray-600">
                Asesoramiento profesional en bienes raíces en <strong>Alta Gracia</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contacto optimizada */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Buscas <strong>inmobiliaria en Alta Gracia</strong>?
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            En <strong>Inmobiliaria Scotto</strong> somos expertos en el mercado de propiedades de <strong>Alta Gracia</strong>. 
            Contáctanos y te ayudaremos a encontrar exactamente lo que necesitas.
          </p>
          <div className="space-y-4 mb-8">
            <p className="text-lg">
              📍 <strong>Ubicación:</strong> Alta Gracia, Córdoba
            </p>
            <p className="text-lg">
              📞 <strong>Contacto:</strong> Consulta por WhatsApp o email
            </p>
          </div>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20Inmobiliaria%20Scotto%20Alta%20Gracia&body=Hola,%20me%20interesa%20conocer%20más%20sobre%20las%20propiedades%20en%20Alta%20Gracia."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 inline-block mx-2"
          >
            Contactar por Email
          </Link>
          <Link
            href="https://wa.me/5493547570838" // Reemplaza con tu número real
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 inline-block mx-2"
          >
            Contactar por WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}