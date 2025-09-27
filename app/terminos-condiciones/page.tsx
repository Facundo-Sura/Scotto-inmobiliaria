'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TerminosCondiciones() {
  const [activeTab, setActiveTab] = useState<'inmobiliaria' | 'martillero'>('inmobiliaria');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Términos y Condiciones</h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab('inmobiliaria')}
          className={`px-6 py-3 font-medium rounded-l-lg ${
            activeTab === 'inmobiliaria' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Inmobiliaria
        </button>
        <button
          onClick={() => setActiveTab('martillero')}
          className={`px-6 py-3 font-medium rounded-r-lg ${
            activeTab === 'martillero' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Martillero
        </button>
      </div>
      
      {/* Content */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        {activeTab === 'inmobiliaria' ? (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Términos y Condiciones - Servicios Inmobiliarios</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Introducción</h3>
                <p className="text-gray-700">
                  Estos Términos y Condiciones regulan la relación entre Eduardo Raul Scotto Inmobiliaria y los usuarios 
                  que acceden a nuestros servicios inmobiliarios. Al utilizar nuestros servicios, usted acepta estos términos 
                  en su totalidad.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">2. Servicios Inmobiliarios</h3>
                <p className="text-gray-700">
                  Ofrecemos servicios de compra, venta, alquiler y administración de propiedades en Alta Gracia, Córdoba 
                  y alrededores. Nuestros servicios están sujetos a disponibilidad y pueden variar según la demanda del mercado.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">3. Información de Propiedades</h3>
                <p className="text-gray-700">
                  La información proporcionada sobre las propiedades se basa en datos proporcionados por los propietarios. 
                  Si bien nos esforzamos por garantizar la precisión de esta información, no podemos garantizar su exactitud 
                  completa. Recomendamos a los clientes verificar todos los detalles antes de realizar cualquier transacción.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">4. Comisiones y Honorarios</h3>
                <p className="text-gray-700">
                  Nuestras comisiones y honorarios varían según el tipo de servicio. Estos se acordarán por escrito antes 
                  de iniciar cualquier servicio. Los pagos deben realizarse según los términos acordados en el contrato 
                  correspondiente.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">5. Responsabilidades del Cliente</h3>
                <p className="text-gray-700">
                  Los clientes son responsables de proporcionar información precisa y completa sobre sus propiedades o 
                  requisitos. También deben cumplir con todas las obligaciones legales relacionadas con la propiedad, 
                  incluyendo impuestos y regulaciones locales.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">6. Limitación de Responsabilidad</h3>
                <p className="text-gray-700">
                  Eduardo Raul Scotto Inmobiliaria no será responsable por daños indirectos, incidentales o consecuentes 
                  que surjan del uso de nuestros servicios. Nuestra responsabilidad está limitada al monto de las comisiones 
                  recibidas por el servicio específico.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">7. Ley Aplicable</h3>
                <p className="text-gray-700">
                  Estos términos se rigen por las leyes de Argentina y cualquier disputa será resuelta en los tribunales 
                  de Córdoba.
                </p>
              </section>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Términos y Condiciones - Servicios de Martillero</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Introducción</h3>
                <p className="text-gray-700">
                  Estos Términos y Condiciones regulan la relación entre Eduardo Raul Scotto Martillero y los usuarios 
                  que acceden a nuestros servicios de subastas y ventas de vehículos. Al utilizar nuestros servicios, 
                  usted acepta estos términos en su totalidad.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">2. Servicios de Martillero</h3>
                <p className="text-gray-700">
                  Ofrecemos servicios de subastas, tasaciones y ventas de vehículos en Alta Gracia, Córdoba y alrededores. 
                  Nuestros servicios están sujetos a disponibilidad y pueden variar según las condiciones del mercado.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">3. Información de Vehículos</h3>
                <p className="text-gray-700">
                  La información proporcionada sobre los vehículos se basa en datos proporcionados por los propietarios o 
                  vendedores. Si bien nos esforzamos por garantizar la precisión de esta información, recomendamos a los 
                  compradores realizar una inspección completa antes de cualquier compra.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">4. Subastas y Ofertas</h3>
                <p className="text-gray-700">
                  Las subastas se realizan de acuerdo con las leyes argentinas aplicables. Las ofertas son vinculantes y 
                  los compradores deben cumplir con los términos de pago establecidos. Las comisiones de martillero se 
                  aplicarán según las tarifas vigentes.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">5. Pagos y Transferencias</h3>
                <p className="text-gray-700">
                  Los pagos deben realizarse según los términos acordados en cada subasta o venta. La transferencia de 
                  propiedad del vehículo se completará solo después de la verificación del pago completo y el cumplimiento 
                  de todos los requisitos legales.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">6. Garantías</h3>
                <p className="text-gray-700">
                  Los vehículos se venden en su estado actual. Eduardo Raul Scotto Martillero no ofrece garantías adicionales 
                  más allá de las legalmente requeridas. Los compradores aceptan los vehículos con sus defectos conocidos y 
                  desconocidos.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">7. Limitación de Responsabilidad</h3>
                <p className="text-gray-700">
                  Eduardo Raul Scotto Martillero no será responsable por daños indirectos, incidentales o consecuentes 
                  relacionados con la compra o venta de vehículos. Nuestra responsabilidad está limitada al monto de las 
                  comisiones recibidas por el servicio específico.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-2">8. Ley Aplicable</h3>
                <p className="text-gray-700">
                  Estos términos se rigen por las leyes de Argentina y cualquier disputa será resuelta en los tribunales 
                  de Córdoba.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}