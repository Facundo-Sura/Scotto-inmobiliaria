'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PreguntasFrecuentes() {
  const [activeTab, setActiveTab] = useState<'inmobiliaria' | 'martillero'>('inmobiliaria');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h1>
      
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
            <h2 className="text-2xl font-bold text-red-600 mb-4">Preguntas Frecuentes - Servicios Inmobiliarios</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Qué servicios inmobiliarios ofrecen?</h3>
                <p className="text-gray-700">
                  Ofrecemos servicios completos de compra, venta y alquiler de propiedades en Alta Gracia y alrededores. 
                  También brindamos asesoramiento legal, tasaciones profesionales y administración de propiedades.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Cuáles son las comisiones por venta de una propiedad?</h3>
                <p className="text-gray-700">
                  Las comisiones estándar en Argentina suelen ser del 3% al 4% del valor de la propiedad, pero pueden 
                  variar según el tipo de propiedad y la complejidad de la transacción. Le invitamos a contactarnos para 
                  recibir información específica para su caso.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Qué documentación necesito para vender mi propiedad?</h3>
                <p className="text-gray-700">
                  Necesitará el título de propiedad, DNI, certificado de dominio, certificado de inhibición, planos 
                  aprobados de la propiedad, y comprobantes de pago de impuestos y servicios. Nuestro equipo le guiará 
                  durante todo el proceso.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Cuánto tiempo toma vender una propiedad?</h3>
                <p className="text-gray-700">
                  El tiempo de venta varía según diversos factores como la ubicación, el precio, las condiciones del 
                  mercado y el tipo de propiedad. En promedio, puede tomar entre 3 y 6 meses, aunque algunas propiedades 
                  pueden venderse más rápido si están bien ubicadas y correctamente tasadas.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Qué zonas cubren sus servicios inmobiliarios?</h3>
                <p className="text-gray-700">
                  Nos especializamos en Alta Gracia y sus alrededores, incluyendo Villa Carlos Paz, Anisacate, La Bolsa, 
                  y otras localidades cercanas en la provincia de Córdoba.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Ofrecen financiamiento para la compra de propiedades?</h3>
                <p className="text-gray-700">
                  No ofrecemos financiamiento directo, pero trabajamos con varias entidades financieras y podemos 
                  asesorarle sobre las mejores opciones de crédito hipotecario disponibles en el mercado según su situación 
                  particular.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Cómo puedo publicar mi propiedad con ustedes?</h3>
                <p className="text-gray-700">
                  Puede contactarnos por teléfono, correo electrónico o visitando nuestra oficina. Coordinaremos una 
                  visita para evaluar la propiedad, tomar fotografías profesionales y recopilar toda la información 
                  necesaria para crear un anuncio atractivo.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Preguntas Frecuentes - Servicios de Martillero</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Qué servicios ofrece Eduardo Raul Scotto como martillero?</h3>
                <p className="text-gray-700">
                  Como martillero, ofrecemos servicios de subastas de vehículos, tasaciones profesionales, asesoramiento 
                  en compra y venta de automóviles, y gestión de documentación para transferencias vehiculares.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Cómo funciona el proceso de subasta de vehículos?</h3>
                <p className="text-gray-700">
                  Las subastas se anuncian con anticipación, detallando los vehículos disponibles. Los interesados pueden 
                  inspeccionar los vehículos antes de la subasta. El día del evento, los participantes registrados pueden 
                  realizar ofertas, y el vehículo se adjudica al mejor postor. Luego se completa la documentación y el pago.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Qué documentación necesito para comprar un vehículo en subasta?</h3>
                <p className="text-gray-700">
                  Necesitará su DNI, comprobante de domicilio, CUIT/CUIL, y medios de pago según lo establecido en las 
                  condiciones de la subasta. Para la transferencia, se requerirán formularios específicos que nuestro 
                  equipo le ayudará a completar.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Cuáles son las comisiones por la compra de un vehículo?</h3>
                <p className="text-gray-700">
                  Las comisiones varían según el tipo de vehículo y el valor de venta. Generalmente, oscilan entre el 5% y 
                  el 10% del valor de adjudicación. Las comisiones específicas se detallan en las condiciones de cada subasta.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Ofrecen garantía por los vehículos vendidos?</h3>
                <p className="text-gray-700">
                  Los vehículos se venden en su estado actual. Proporcionamos toda la información disponible sobre el 
                  estado del vehículo, pero recomendamos a los compradores realizar una inspección detallada antes de 
                  ofertar. Las garantías específicas, si las hay, se detallarán en la descripción de cada vehículo.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">¿Con qué frecuencia realizan subastas de vehículos?</h3>
                <p className="text-gray-700">
                  Realizamos subastas regularmente, generalmente una o dos veces al mes, dependiendo de la disponibilidad 
                  de vehículos. Las fechas se anuncian en nuestra página web y redes sociales con al menos dos semanas de 
                  anticipación.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">¿Cómo puedo vender mi vehículo a través de ustedes?</h3>
                <p className="text-gray-700">
                  Puede contactarnos para coordinar una evaluación de su vehículo. Nuestros expertos realizarán una 
                  tasación y le explicarán las opciones disponibles, ya sea para venta directa o inclusión en próximas 
                  subastas. Le asesoraremos sobre el precio estimado y los documentos necesarios.
                </p>
              </div>
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