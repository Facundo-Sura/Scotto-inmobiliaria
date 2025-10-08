'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function AcercaDeMi() {
  const pathname = usePathname()
  const isInmobiliaria = pathname.includes('inmobiliaria')
  const isMartillero = pathname.includes('martillero')
  
  // Definir colores según la sección
  const bgColor = isInmobiliaria 
    ? 'bg-blue-50' 
    : isMartillero 
      ? 'bg-amber-50' 
      : 'bg-gray-50'
  
  const textColor = isInmobiliaria 
    ? 'text-blue-800' 
    : isMartillero 
      ? 'text-amber-800' 
      : 'text-gray-800'
  
  const accentColor = isInmobiliaria 
    ? 'bg-blue-600' 
    : isMartillero 
      ? 'bg-amber-600' 
      : 'bg-gray-600'

  return (
    <div className={`min-h-screen ${bgColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold ${textColor} mb-8 text-center`}>
          Acerca de Mí
        </h1>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Sección de perfil con diseño responsive */}
          <div className="md:flex">
            {/* Foto de perfil */}
            <div className="md:w-1/3 flex justify-center items-center p-6 md:p-8">
              <div className="relative w-64 h-64 md:w-full md:h-auto aspect-square rounded-full overflow-hidden border-4 border-gray-200">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Eduardo Raul Scotto" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Información personal */}
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Eduardo Raul Scotto</h2>
              <div className={`${accentColor} h-1 w-20 mb-4`}></div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Matrícula Profesional</h3>
                <p className="text-gray-600">Nª de Matrícula: 2127</p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">Biografía</h3>
                <p className="text-gray-600">
                  Con más de 20 años de experiencia en el sector inmobiliario y como martillero público, 
                  he dedicado mi carrera profesional a brindar un servicio de excelencia basado en la 
                  transparencia, honestidad y compromiso con mis clientes.
                </p>
                <p className="text-gray-600">
                  Mi formación académica y constante actualización me permiten ofrecer asesoramiento 
                  especializado tanto en operaciones inmobiliarias como en subastas públicas y privadas, 
                  adaptándome a las necesidades específicas de cada cliente.
                </p>
                <p className="text-gray-600">
                  A lo largo de mi trayectoria, he gestionado con éxito cientos de operaciones inmobiliarias 
                  y subastas, construyendo una sólida reputación basada en resultados y en la confianza 
                  que mis clientes depositan en mi trabajo.
                </p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Especialidades</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Tasaciones</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Compra-Venta</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Alquileres</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Subastas</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Inventarios</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Peritajes</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección de contacto */}
          <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">(3547) 57-0838</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <span className="text-gray-600">inmobiliariascotto@hotmail.com</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">Alvear 81, Alta Gracia</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">Lun-Vie: 9:00 - 12:30 / 18:00 - 20:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}