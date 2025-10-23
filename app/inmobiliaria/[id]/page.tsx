"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "../../components/ImageCarousel";

// Tipo para las propiedades
interface Propiedad {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: "casa" | "departamento" | "terreno" | "local";
  operacion: "venta" | "alquiler";
  direccion: string;
  habitaciones: number | null;
  metros: number | null;
  imagen: string | null;
  imagenes?: string[];
  created_at: string;
  updated_at: string;
}

export default function PropiedadDetallePage() {
  const params = useParams();
  const id = params.id as string;

  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        setLoading(true);
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://scotto-inmobiliaria-backend.onrender.com";
        const res = await fetch(`${apiUrl}/inmobiliaria/${id}`);

        if (!res.ok) throw new Error("Error al cargar la propiedad");

        const data = await res.json();
        setPropiedad(data);
      } catch (err) {
        setError("No se pudo cargar la propiedad");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropiedad();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <span className="ml-3 text-lg">Cargando propiedad...</span>
      </div>
    );
  }

  if (error || !propiedad) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || "Propiedad no encontrada"}
        </div>
        <Link
          href="/inmobiliaria"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  // Preparar array de imágenes
  const imagenes = propiedad.imagenes && propiedad.imagenes.length > 0 
    ? propiedad.imagenes 
    : propiedad.imagen 
      ? [propiedad.imagen] 
      : [];

  const tituloEncode = encodeURIComponent(propiedad.titulo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/inmobiliaria" className="text-white hover:text-gray-200">
            ← Volver al listado
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Imagen principal con ImageCarousel */}
        {imagenes.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <ImageCarousel 
              imagenes={imagenes}
              titulo={propiedad.titulo}

            />
          </div>
        ) : (
          <div className="h-96 w-full bg-gray-200 rounded-lg flex items-center justify-center mb-8">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}

        {/* Información principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                  {propiedad.titulo}
                </h1>
                <div className="flex flex-col sm:items-end">
                  <span className="text-2xl font-bold text-red-600">
                    {formatPrice(propiedad.precio)}
                  </span>
                  <span className="text-sm text-gray-600 capitalize">
                    {propiedad.operacion} - {propiedad.tipo}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{propiedad.direccion}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {propiedad.habitaciones !== null && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {propiedad.habitaciones}
                    </div>
                    <div className="text-sm text-gray-600">
                      {propiedad.habitaciones === 1 ? "Habitación" : "Habitaciones"}
                    </div>
                  </div>
                )}
                {propiedad.metros !== null && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {propiedad.metros}
                    </div>
                    <div className="text-sm text-gray-600">m²</div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 capitalize">
                    {propiedad.tipo}
                  </div>
                  <div className="text-sm text-gray-600">Tipo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 capitalize">
                    {propiedad.operacion}
                  </div>
                  <div className="text-sm text-gray-600">Operación</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">
                  {propiedad.descripcion}
                </p>
              </div>
            </div>

            {/* Galería de imágenes adicionales */}
            {imagenes.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Galería de Imágenes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {imagenes.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-32 w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                      onClick={() => window.open(img, "_blank")}
                    >
                      <Image
                        src={img}
                        alt={`${propiedad.titulo} - Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Contacto */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">
                ¿Te interesa esta propiedad?
              </h3>

              <div className="space-y-4">
                <Link
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20sobre%20propiedad&body=${tituloEncode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Contactar por email
                </Link>

                <Link
                  href={`https://wa.me/5493510000000?text=Hola,%20me%20interesa%20la%20propiedad:%20${tituloEncode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Contactar por WhatsApp
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Información del contacto:</h4>
                <p className="text-gray-600 mb-1">Inmobiliaria Scotto</p>
                <p className="text-gray-600 mb-1">
                  Email:{" "}
                  <a
                    href="mailto:inmobiliariascotto@hotmail.com"
                    className="text-red-600 hover:underline"
                  >
                    inmobiliariascotto@hotmail.com
                  </a>
                </p>
                <p className="text-gray-600 mb-1">
                  Teléfono:{" "}
                  <a
                    href="tel:+5493510000000"
                    className="text-red-600 hover:underline"
                  >
                    +54 9 351 000-0000
                  </a>
                </p>
                <p className="text-gray-600">
                  Dirección: Av. Siempre Viva 123, Córdoba
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}