import Link from "next/link";
import type { Metadata } from "next";

// Metadata optimizada para la página principal
export const metadata: Metadata = {
  title: "Eduardo Raul Scotto | Martillero Público e Inmobiliaria en Alta Gracia, Córdoba",
  description: "Eduardo Raul Scotto - Martillero público y judicial especializado en servicios inmobiliarios y subastas en Alta Gracia, Córdoba. Propiedades, vehículos y subastas judiciales.",
  keywords: [
    "eduardo raul scotto",
    "martillero público alta gracia",
    "inmobiliaria scotto alta gracia", 
    "martillero judicial córdoba",
    "subastas alta gracia",
    "propiedades alta gracia",
    "venta de autos alta gracia",
    "inmobiliaria en alta gracia",
    "martillero en alta gracia"
  ].join(", "),
  authors: [{ name: "Eduardo Raul Scotto" }],
  creator: "Eduardo Raul Scotto",
  openGraph: {
    title: "Eduardo Raul Scotto | Martillero e Inmobiliaria en Alta Gracia",
    description: "Martillero público y servicios inmobiliarios en Alta Gracia, Córdoba. Propiedades, vehículos y subastas.",
    url: "https://scotto-inmobiliaria.com",
    siteName: "Eduardo Raul Scotto - Martillero e Inmobiliaria",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/og-landing.jpg",
        width: 1200,
        height: 630,
        alt: "Eduardo Raul Scotto - Martillero e Inmobiliaria Alta Gracia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Raul Scotto | Martillero e Inmobiliaria en Alta Gracia",
    description: "Servicios inmobiliarios y de martillero en Alta Gracia, Córdoba",
    images: ["/images/og-landing.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Optimizada */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Eduardo Raul Scotto
            </h1>
            <p className="text-xl md:text-3xl mb-4 font-semibold">
              Martillero Público y Judicial
            </p>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Servicios inmobiliarios profesionales y subastas en <strong>Alta Gracia, Córdoba</strong>. 
              Más de 20 años de experiencia en el mercado.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/inmobiliaria"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center text-lg"
              >
                🏠 Ver Propiedades en Alta Gracia
              </Link>
              <Link
                href="/martillero"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center text-lg"
              >
                🚗 Ver Vehículos Disponibles
              </Link>
            </div>
            
            {/* Información de contacto destacada */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">📍 Ubicación</h3>
                <p>Alta Gracia, Córdoba</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">📞 Contacto</h3>
                <p>inmobiliariascotto@hotmail.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">⚖️ Matrícula</h3>
                <p>Martillero Público Certificado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Especialidades */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios Profesionales en <strong>Alta Gracia</strong>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Como <strong>martillero público y judicial</strong> en Alta Gracia, 
              ofrezco servicios integrales para todas tus necesidades inmobiliarias y de subastas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sección Inmobiliaria Optimizada */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-red-600 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold">Inmobiliaria Scotto</h3>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                  Inmobiliaria en Alta Gracia
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  <strong>Inmobiliaria Scotto</strong> ofrece servicios completos de compra, venta 
                  y alquiler de propiedades en <strong>Alta Gracia y zona</strong>. 
                  Encuentra casas, departamentos, terrenos y locales comerciales 
                  con asesoramiento profesional personalizado.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">🏠 Casas y departamentos</p>
                  <p className="text-sm text-gray-600">📐 Terrenos y lotes</p>
                  <p className="text-sm text-gray-600">🏪 Locales comerciales</p>
                </div>
                <Link
                  href="/inmobiliaria"
                  className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-center"
                >
                  Ver Propiedades Disponibles
                </Link>
              </div>
            </div>

            {/* Sección Martillero Optimizada */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-blue-600 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold">Martillero Público</h3>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  Martillero en Alta Gracia
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  <strong>Eduardo Raul Scotto</strong>, martillero público y judicial 
                  con amplia experiencia en <strong>Alta Gracia y Córdoba</strong>. 
                  Especializado en venta de vehículos, subastas, tasaciones 
                  y asesoramiento legal para compra y venta de autos.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">🚗 Venta de vehículos</p>
                  <p className="text-sm text-gray-600">⚖️ Tasaciones profesionales</p>
                  <p className="text-sm text-gray-600">📋 Asesoramiento legal</p>
                </div>
                <Link
                  href="/martillero"
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-center"
                >
                  Ver Vehículos Disponibles
                </Link>
              </div>
            </div>

            {/* Sección Subastas Optimizada */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-green-600 flex items-center justify-center relative">
                <div className="text-white text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold">Subastas Judiciales</h3>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-600">
                  Subastas en Alta Gracia
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Participa en nuestras <strong>subastas judiciales y públicas</strong> 
                  en <strong>Alta Gracia</strong>. Oportunidades únicas en propiedades, 
                  vehículos y artículos diversos con precios competitivos 
                  y transacciones completamente seguras y legales.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">🏘️ Propiedades en subasta</p>
                  <p className="text-sm text-gray-600">🚙 Vehículos judiciales</p>
                  <p className="text-sm text-gray-600">📦 Artículos diversos</p>
                </div>
                <Link
                  href="/subastas"
                  className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-center"
                >
                  Ver Subastas Activas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Experiencia */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            ¿Por qué elegir a <strong>Eduardo Raul Scotto</strong>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="font-bold mb-2">Martillero Certificado</h3>
              <p className="text-gray-600 text-sm">Matrícula profesional habilitante</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-bold mb-2">Especialista en Alta Gracia</h3>
              <p className="text-gray-600 text-sm">Conocimiento local del mercado</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="font-bold mb-2">+20 Años de Experiencia</h3>
              <p className="text-gray-600 text-sm">Trayectoria comprobada</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-bold mb-2">Transacciones Seguras</h3>
              <p className="text-gray-600 text-sm">Procesos legales garantizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto Optimizada */}
      <section className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Necesitas asesoramiento profesional en <strong>Alta Gracia</strong>?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contáctame para recibir atención personalizada sobre propiedades, vehículos 
            o subastas en <strong>Alta Gracia, Córdoba</strong>. Resolveré todas tus dudas 
            y te ayudaré a encontrar exactamente lo que buscas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20Eduardo%20Raul%20Scotto%20-%20Martillero%20Alta%20Gracia&body=Hola%20Sr.%20Eduardo%20Raul%20Scotto,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20en%20Alta%20Gracia."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 text-center"
            >
              📧 Contactar por Email
            </Link>
            <Link
              href="https://wa.me/5493547570838?text=Hola%20Sr.%20Eduardo%20Raul%20Scotto,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20en%20Alta%20Gracia."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-center"
            >
              💬 Contactar por WhatsApp
            </Link>
          </div>
          
          <div className="text-sm opacity-90">
            <p>📍 <strong>Zona de cobertura:</strong> Alta Gracia, Córdoba y localidades aledañas</p>
            <p className="mt-2">⚖️ <strong>Martillero Público y Judicial</strong> - Matrícula profesional</p>
          </div>
        </div>
      </section>
    </div>
  );
}