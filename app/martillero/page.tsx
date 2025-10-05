import React from "react";
import Link from "next/link";
import Image from "next/image";

// Tipo para los vehículos
type Vehiculo = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  caracteristicas: string[];
  imagen: string;
};

// Función para obtener los vehículos
async function getVehiculos(): Promise<Vehiculo[]> {
  try {
    // Durante el build, usar ruta del sistema de archivos
    if (
      process.env.NODE_ENV === "production" &&
      !process.env.NEXT_PUBLIC_BASE_URL
    ) {
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        "vehiculos.json"
      );
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContents);
      return data.vehiculos;
    }

    // En desarrollo o con BASE_URL configurada
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/data/vehiculos.json`);
    const data = await res.json();
    return data.vehiculos;
  } catch (error) {
    console.error("Error al cargar los datos de vehículos:", error);
    return [];
  }
}

export default async function MartilleroPage() {
  // Obtener los vehículos desde el JSON
  const vehiculos = await getVehiculos();

  // Nota: Como ahora es un componente de servidor, no podemos usar useState para filtros
  // En una implementación real, usaríamos searchParams o un componente cliente para filtros
  const vehiculosFiltrados = vehiculos;

  // Obtener marcas únicas para el filtro
  const marcasUnicas = [...new Set(vehiculos.map((v) => v.marca))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Martillero Eduardo Raul Scotto
          </h1>
          <p className="text-xl mb-8">
            Vehículos seleccionados con las mejores garantías
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo de vehículo
              </label>
              <select
                id="tipo"
                defaultValue="todos"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="auto">Auto</option>
                <option value="camioneta">Camioneta</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="marca"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Marca
              </label>
              <select
                id="marca"
                defaultValue="todos"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="todos">Todas</option>
                {marcasUnicas.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Listado de vehículos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Vehículos disponibles
          </h2>

          {vehiculosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No se encontraron vehículos con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehiculosFiltrados.map((vehiculo) => (
                <div
                  key={vehiculo.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <Image
                    src={vehiculo.imagen}
                    alt={vehiculo.titulo}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{vehiculo.titulo}</h3>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        {vehiculo.tipo}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      <span>{vehiculo.año}</span>
                      <span>{vehiculo.kilometraje.toLocaleString()} km</span>
                    </div>
                    <p className="text-gray-700 mb-4">{vehiculo.descripcion}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Características:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {vehiculo.caracteristicas.map(
                          (caracteristica, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              • {caracteristica}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        ${vehiculo.precio.toLocaleString()}
                      </span>
                      <Link
                        href={`/martillero/${vehiculo.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de servicios */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Nuestros servicios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Compra y venta</h3>
              <p className="text-gray-600">
                Asesoramiento profesional para la compra y venta de vehículos
                con todas las garantías legales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Subastas</h3>
              <p className="text-gray-600">
                Organización y gestión de subastas de vehículos con
                transparencia y seguridad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tasaciones</h3>
              <p className="text-gray-600">
                Tasación profesional de vehículos para conocer su valor real en
                el mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Interesado en algún vehículo?
          </h2>
          <p className="text-xl mb-8">
            Contáctanos para más información o para concertar una visita.
          </p>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20desde%20tu%20portafolio&body=Hola%20Facu,%20quiero%20saber%20más%20sobre%20tus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
