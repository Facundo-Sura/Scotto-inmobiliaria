"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "../../components/ImageCarousel";
import Head from "next/head";

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

  // Función para generar metadata dinámica para SEO
  const generatePropertyMetadata = () => {
    if (!propiedad) return null;

    const formattedPrice = new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(propiedad.precio);

    const title = `${propiedad.titulo} - ${formattedPrice} | Inmobiliaria Scotto Alta Gracia`;
    const description = `${propiedad.descripcion.substring(0, 160)}... ${propiedad.tipo} en ${propiedad.operacion} en Alta Gracia. ${propiedad.habitaciones ? `${propiedad.habitaciones} hab.` : ''} ${propiedad.metros ? `${propiedad.metros}m²` : ''}. Inmobiliaria Scotto.`;

    return {
      title,
      description,
      canonical: `https://scotto-inmobiliaria.com/propiedades/${id}`,
      openGraph: {
        title,
        description,
        type: 'property',
        images: propiedad.imagenes && propiedad.imagenes.length > 0 
          ? propiedad.imagenes 
          : propiedad.imagen 
            ? [propiedad.imagen] 
            : [],
      }
    };
  };

  const metadata = generatePropertyMetadata();

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
          Volver al listado de propiedades en Alta Gracia
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
  const formattedPrice = formatPrice(propiedad.precio);

  return (
    <>
      {/* Metadata dinámica para SEO */}
      {metadata && (
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={`inmobiliaria scotto, ${propiedad.tipo} ${propiedad.operacion} alta gracia, propiedades alta gracia, ${propiedad.habitaciones ? `${propiedad.habitaciones} habitaciones` : ''}`} />
          <link rel="canonical" href={metadata.canonical} />
          
          {/* Open Graph */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:type" content="property" />
          <meta property="og:url" content={metadata.canonical} />
          {imagenes.length > 0 && (
            <meta property="og:image" content={imagenes[0]} />
          )}
          
          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SingleFamilyResidence",
                "name": propiedad.titulo,
                "description": propiedad.descripcion,
                "url": metadata.canonical,
                "image": imagenes.length > 0 ? imagenes : [],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Alta Gracia",
                  "addressRegion": "Córdoba",
                  "addressCountry": "AR"
                },
                "offers": {
                  "@type": "Offer",
                  "price": propiedad.precio,
                  "priceCurrency": "ARS",
                  "availability": "https://schema.org/InStock",
                  "validFrom": new Date().toISOString()
                },
                "numberOfRooms": propiedad.habitaciones,
                "floorSize": propiedad.metros ? {
                  "@type": "QuantitativeValue",
                  "value": propiedad.metros,
                  "unitCode": "MTK"
                } : undefined
              })
            }}
          />
        </Head>
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Header con breadcrumb optimizado */}
        <div className="bg-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-white hover:text-gray-200">
                Inicio
              </Link>
              <span>›</span>
              <Link href="/inmobiliaria" className="text-white hover:text-gray-200">
                Propiedades en Alta Gracia
              </Link>
              <span>›</span>
              <span className="text-white font-semibold">
                {propiedad.titulo}
              </span>
            </nav>
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
              <span className="text-gray-500">Imagen no disponible - Inmobiliaria Scotto Alta Gracia</span>
            </div>
          )}

          {/* Información principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Información principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                    {propiedad.titulo} - <span className="text-red-600">{formattedPrice}</span>
                  </h1>
                  <div className="flex flex-col sm:items-end">
                    <span className="text-2xl font-bold text-red-600">
                      {formattedPrice}
                    </span>
                    <span className="text-sm text-gray-600 capitalize">
                      {propiedad.operacion} - {propiedad.tipo} en Alta Gracia
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 flex items-center">
                  📍 {propiedad.direccion}, Alta Gracia, Córdoba
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {propiedad.habitaciones !== null && (
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {propiedad.habitaciones}
                      </div>
                      <div className="text-sm text-gray-600">
                        {propiedad.habitaciones === 1 ? "Habitación" : "Habitaciones"}
                      </div>
                    </div>
                  )}
                  {propiedad.metros !== null && (
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {propiedad.metros}
                      </div>
                      <div className="text-sm text-gray-600">Metros cuadrados</div>
                    </div>
                  )}
                  <div className="text-center bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                      {propiedad.tipo}
                    </div>
                    <div className="text-sm text-gray-600">Tipo de propiedad</div>
                  </div>
                  <div className="text-center bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 capitalize">
                      {propiedad.operacion}
                    </div>
                    <div className="text-sm text-gray-600">Operación</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Descripción de la Propiedad</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {propiedad.descripcion}
                  </p>
                  <p className="mt-4 text-gray-600">
                    <strong>Inmobiliaria Scotto</strong> te ofrece esta excelente oportunidad en <strong>Alta Gracia</strong>. 
                    Contáctanos para más información y agendar una visita.
                  </p>
                </div>
              </div>

              {/* Galería de imágenes adicionales */}
              {imagenes.length > 1 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4">Galería de Imágenes - {propiedad.titulo}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagenes.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-32 w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                        onClick={() => window.open(img, "_blank")}
                      >
                        <Image
                          src={img}
                          alt={`${propiedad.titulo} - Imagen ${index + 1} - Inmobiliaria Scotto Alta Gracia`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna derecha - Contacto optimizado */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">
                  ¿Te interesa esta propiedad en Alta Gracia?
                </h3>
                <p className="text-gray-600 mb-4">
                  Contacta a <strong>Inmobiliaria Scotto</strong> para más información sobre esta {propiedad.tipo} en {propiedad.operacion}.
                </p>

                <div className="space-y-4">
                  <Link
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20sobre%20${encodeURIComponent(propiedad.titulo)}%20-%20Inmobiliaria%20Scotto&body=Hola,%20me%20interesa%20la%20propiedad:%20${tituloEncode}%20${formattedPrice}%20${propiedad.operacion}%20en%20Alta%20Gracia.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    📧 Contactar por Email
                  </Link>

                  <Link
                    href={`https://wa.me/5493547570838?text=Hola%20Inmobiliaria%20Scotto,%20me%20interesa%20la%20propiedad:%20${tituloEncode}%20${formattedPrice}%20${propiedad.operacion}%20en%20Alta%20Gracia.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    💬 Contactar por WhatsApp
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-3">Inmobiliaria Scotto - Alta Gracia</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      🏢 <strong className="ml-2">Inmobiliaria Scotto</strong>
                    </p>
                    <p className="flex items-center">
                      📧{" "}
                      <a
                        href="mailto:inmobiliariascotto@hotmail.com"
                        className="ml-2 text-red-600 hover:underline"
                      >
                        inmobiliariascotto@hotmail.com
                      </a>
                    </p>
                    <p className="flex items-center">
                      📞{" "}
                      <a
                        href="tel:+5493510000000"
                        className="ml-2 text-red-600 hover:underline"
                      >
                        +54 9 351 000-0000
                      </a>
                    </p>
                    <p className="flex items-start">
                      📍 <span className="ml-2">Especialistas en propiedades en <strong>Alta Gracia</strong> y zona</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}