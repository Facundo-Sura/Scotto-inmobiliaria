import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Eduardo Raul Scotto
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Martillero público y judicial y servicios inmobiliarios en Alta Gracia, Córdoba
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/inmobiliaria"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Inmobiliaria
              </Link>
              <Link
                href="/martillero"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 text-center"
              >
                Martillero
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones Principales */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sección Inmobiliaria */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-red-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-white"
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
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600">
                  Inmobiliaria
                </h2>
                <p className="text-gray-700 mb-6">
                  Ofrecemos servicios inmobiliarios completos en Alta Gracia y
                  alrededores. Compra, venta y alquiler de propiedades con
                  asesoramiento profesional.
                </p>
                <Link
                  href="/inmobiliaria"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Ver propiedades
                </Link>
              </div>
            </div>

            {/* Sección Martillero */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-blue-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-white"
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
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  Martillero
                </h2>
                <p className="text-gray-700 mb-6">
                  Eduardo Raul Scotto, martillero profesional especializado en
                  la venta de vehículos. Subastas, tasaciones y asesoramiento
                  legal para compra y venta de autos.
                </p>
                <Link
                  href="/martillero"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Ver vehículos
                </Link>
              </div>
            </div>

            {/* Sección Subastas */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-64 bg-green-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 text-white"
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
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-600">
                  Subastas
                </h2>
                <p className="text-gray-700 mb-6">
                  Participa en nuestras subastas de propiedades, vehículos y artículos diversos. 
                  Oportunidades únicas con precios competitivos y transacciones seguras.
                </p>
                <Link
                  href="/subastas"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Ver subastas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">¿Necesitas asesoramiento?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contáctanos para recibir atención personalizada sobre propiedades o
            vehículos en Alta Gracia, Córdoba.
          </p>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20desde%20inmobiliariascotto.com&body=Hola%20señor%20Eduado%20Scotto,%20quiero%20saber%20más%20sobre%20sus%20servicios%20inmobiliarios."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Contactar
          </Link>
        </div>
      </section>
    </div>
  );
}
