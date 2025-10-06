import React from "react";
import Link from "next/link";
import PropertyList from "../components/PropertyList";

// Tipo para las propiedades
type Propiedad = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  categoria: string;
  ubicacion: string;
  caracteristicas: string[];
  imagen: string;
};

// Función para obtener las propiedades
async function getPropiedades(): Promise<Propiedad[]> {
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
        "propiedades.json"
      );
      const fileContents = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileContents);
      return data.propiedades;
    }

    // En desarrollo o con BASE_URL configurada
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/data/propiedades.json`);
    const data = await res.json();
    return data.propiedades;
  } catch (error) {
    console.error("Error al cargar los datos de propiedades:", error);
    return [];
  }
}

export default async function InmobiliariaPage() {
  // Obtener las propiedades desde el JSON
  const propiedades = await getPropiedades();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Inmobiliaria Scotto</h1>
          <p className="text-xl mb-8">
            Encuentra la propiedad de tus sueños en Alta Gracia y alrededores
          </p>
        </div>
      </section>

      {/* Componente de filtros y listado de propiedades */}
      <PropertyList propiedades={propiedades} />

      {/* Sección de contacto */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl mb-8">
            Contáctanos y te ayudaremos a encontrar la propiedad perfecta para
            ti.
          </p>
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20desde%20tu%20portafolio&body=Hola%20Facu,%20quiero%20saber%20más%20sobre%20tus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
