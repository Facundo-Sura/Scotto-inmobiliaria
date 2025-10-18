import React from "react";
import Link from "next/link";
import VehicleList from "../components/VehicleList";

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

// Función para obtener los vehículos desde el backend
async function getVehiculos(): Promise<Vehiculo[]> {
  try {
    const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/martillero', {
      cache: 'no-store',
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los datos de vehículos:", error);
    return [];
  }
}

export default async function MartilleroPage() {
  // Obtener los vehículos desde la API
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