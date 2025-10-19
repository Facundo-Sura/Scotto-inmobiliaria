import React from "react";
import VehicleList from "../components/VehicleList";

// Tipo para los vehículos (usar 'anio' internamente)
type Vehiculo = {
  id: string | number;
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
};

// Función para obtener y normalizar los vehículos desde el backend
async function getVehiculos(): Promise<Vehiculo[]> {
  try {
    const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/martillero', {
      cache: 'no-store',
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    // Normaliza los datos ANTES de tiparlos como Vehiculo
    return data.map((item, index) => ({
      id: item.id ?? item._id ?? index,
      titulo: item.titulo ?? item.title ?? '',
      descripcion: item.descripcion ?? item.desc ?? item.description ?? '',
      precio: Number(item.precio ?? 0),
      tipo: item.tipo ?? item.operacion ?? 'venta',
      marca: item.marca ?? '',
      modelo: item.modelo ?? '',
      anio: Number(item.anio ?? item.año ?? item.year) || new Date().getFullYear(),
      kilometraje: Number(item.kilometraje ?? item.km ?? 0) || 0,
      caracteristicas: Array.isArray(item.caracteristicas)
        ? item.caracteristicas
        : (typeof item.caracteristicas === 'string' ? item.caracteristicas.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
      imagen: item.imagen ?? (Array.isArray(item.imagenes) && item.imagenes[0]) ?? '/placeholder.png',
    }));
  } catch (error) {
    console.error("Error al cargar los datos de vehículos:", error);
    return [];
  }
}

export default async function MartilleroPage() {
  const vehiculos = await getVehiculos();

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

      {/* Componente de filtros y listado de vehículos */}
      <VehicleList vehiculos={vehiculos} />

      {/* Resto del código permanece igual... */}
    </div>
  );
}