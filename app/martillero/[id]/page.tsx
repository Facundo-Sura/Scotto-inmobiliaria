'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImageCarousel from '../../components/ImageCarousel';

interface Vehiculo {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  caracteristicas: string[];
  imagen: string;
  imagenes?: string[];
  detalles?: {
    combustible?: string;
    transmision?: string;
    color?: string;
    puertas?: number;
    motor?: string;
    cilindrada?: string;
  };
}

export default function VehiculoDetallePage() {
  const params = useParams();
  const id = params?.id as string;

  const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const res = await fetch(`${apiUrl}/martillero/${id}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const raw = await res.json();

        const veh: Vehiculo = {
          id: raw.id ?? raw._id ?? id ?? '',
          titulo: raw.titulo ?? raw.title ?? '',
          descripcion: raw.descripcion ?? raw.desc ?? raw.description ?? '',
          precio: Number(raw.precio ?? 0),
          tipo: raw.tipo ?? raw.operacion ?? 'venta',
          marca: raw.marca ?? '',
          modelo: raw.modelo ?? '',
          anio: Number(raw.anio ?? raw.año ?? raw.year) || new Date().getFullYear(),
          kilometraje: Number(raw.kilometraje ?? raw.km ?? 0) || 0,
          caracteristicas: Array.isArray(raw.caracteristicas)
            ? raw.caracteristicas
            : (typeof raw.caracteristicas === 'string' ? raw.caracteristicas.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          imagen: raw.imagen ?? (Array.isArray(raw.imagenes) && raw.imagenes[0]) ?? '/logo.png',
          imagenes: Array.isArray(raw.imagenes) ? raw.imagenes : (raw.imagen ? [raw.imagen] : []),
          detalles: {
            combustible: raw.detalles?.combustible ?? raw.combustible ?? '',
            transmision: raw.detalles?.transmision ?? raw.transmision ?? '',
            color: raw.detalles?.color ?? raw.color ?? '',
            puertas: Number(raw.detalles?.puertas ?? raw.puertas) || 0,
            motor: raw.detalles?.motor ?? raw.motor ?? '',
            cilindrada: raw.detalles?.cilindrada ?? raw.cilindrada ?? '',
          }
        };

        setVehiculo(veh);
      } catch (err) {
        console.error('Error fetching vehicle:', err);
        setError('No se pudo cargar el vehículo');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVehiculo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        <span className="ml-3 text-lg">Cargando vehículo...</span>
      </div>
    );
  }

  if (error || !vehiculo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Vehículo no encontrado'}
        </div>
        <Link
          href="/martillero"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);

  const formatKilometraje = (km: number) => new Intl.NumberFormat('es-AR').format(km) + ' km';

  const tituloEncode = encodeURIComponent(vehiculo.titulo);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/martillero" className="text-white hover:text-gray-200">
            ← Volver al listado
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Imagen principal con ImageCarousel */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <ImageCarousel 
            imagenes={vehiculo.imagenes && vehiculo.imagenes.length > 0 ? vehiculo.imagenes : [vehiculo.imagen]}
            titulo={vehiculo.titulo}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{vehiculo.titulo}</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(vehiculo.precio)}</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  {vehiculo.tipo?.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vehiculo.marca}</div>
                  <div className="text-sm text-gray-600">Marca</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vehiculo.modelo}</div>
                  <div className="text-sm text-gray-600">Modelo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vehiculo.anio}</div>
                  <div className="text-sm text-gray-600">Año</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatKilometraje(vehiculo.kilometraje)}</div>
                  <div className="text-sm text-gray-600">Kilometraje</div>
                </div>
              </div>

              {vehiculo.detalles && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Detalles Técnicos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehiculo.detalles.combustible && (
                      <div>
                        <span className="font-medium">Combustible:</span>
                        <span className="ml-2">{vehiculo.detalles.combustible}</span>
                      </div>
                    )}
                    {vehiculo.detalles.transmision && (
                      <div>
                        <span className="font-medium">Transmisión:</span>
                        <span className="ml-2">{vehiculo.detalles.transmision}</span>
                      </div>
                    )}
                    {vehiculo.detalles.color && (
                      <div>
                        <span className="font-medium">Color:</span>
                        <span className="ml-2">{vehiculo.detalles.color}</span>
                      </div>
                    )}
                    {vehiculo.detalles.puertas !== undefined && (
                      <div>
                        <span className="font-medium">Puertas:</span>
                        <span className="ml-2">{vehiculo.detalles.puertas}</span>
                      </div>
                    )}
                    {vehiculo.detalles.motor && (
                      <div>
                        <span className="font-medium">Motor:</span>
                        <span className="ml-2">{vehiculo.detalles.motor}</span>
                      </div>
                    )}
                    {vehiculo.detalles.cilindrada && (
                      <div>
                        <span className="font-medium">Cilindrada:</span>
                        <span className="ml-2">{vehiculo.detalles.cilindrada}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">{vehiculo.descripcion}</p>
              </div>
            </div>

            {vehiculo.caracteristicas && vehiculo.caracteristicas.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Características</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {vehiculo.caracteristicas.map((c, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Galería de imágenes adicionales */}
            {vehiculo.imagenes && vehiculo.imagenes.length > 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Galería de Imágenes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {vehiculo.imagenes.map((img, index) => (
                    <div key={index} className="relative h-32 w-full rounded-lg overflow-hidden">
                      <Image 
                        src={img} 
                        alt={`${vehiculo.titulo} - Imagen ${index + 1}`} 
                        fill 
                        className="object-cover cursor-pointer hover:opacity-80 transition"
                        onClick={() => window.open(img, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">¿Te interesa este vehículo?</h3>

              <div className="space-y-4">
                <Link
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=inmobiliariascotto@hotmail.com&su=Consulta%20sobre%20veh%C3%ADculo&body=${tituloEncode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Contactar por email
                </Link>

                <Link
                  href={`https://wa.me/5493510000000?text=Hola,%20me%20interesa%20el%20veh%C3%ADculo:%20${tituloEncode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Contactar por WhatsApp
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-2">Información del vendedor:</h4>
                <p className="text-gray-600 mb-1">Martillero Eduardo Raul Scotto</p>
                <p className="text-gray-600 mb-1">
                  Email: <a href="mailto:inmobiliariascotto@hotmail.com" className="text-blue-600 hover:underline">inmobiliariascotto@hotmail.com</a>
                </p>
                <p className="text-gray-600 mb-1">
                  Teléfono: <a href="tel:+5493510000000" className="text-blue-600 hover:underline">+54 9 351 000-0000</a>
                </p>
                <p className="text-gray-600">Matrícula: 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}