import { promises as fs } from 'fs';
import path from 'path';
import Detail from '@/app/components/Detail';
import { VehiculoDetalle, ItemTipo } from '@/app/types';

interface PageProps {
  params: { id: string };
}

export default async function VehiculoDetailPage({ params }: PageProps) {
  // Leer el archivo JSON de vehículos
  const dataFilePath = path.join(process.cwd(), 'public', 'data', 'vehiculos.json');
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  // Encontrar el vehículo por ID
  const vehiculo = data.vehiculos.find((v: any) => v.id.toString() === params.id);
  
  if (!vehiculo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Vehículo no encontrado</h1>
          <p className="text-gray-600">El vehículo que buscas no existe.</p>
        </div>
      </div>
    );
  }
  
  // Mapear a la interfaz VehiculoDetalle
  const vehiculoDetalle: VehiculoDetalle = {
    id: vehiculo.id,
    titulo: vehiculo.titulo,
    descripcion: vehiculo.descripcion,
    precio: vehiculo.precio,
    tipo: vehiculo.tipo,
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    año: vehiculo.año,
    kilometraje: vehiculo.kilometraje,
    caracteristicas: vehiculo.caracteristicas,
    imagen: vehiculo.imagen,
    imagenes: vehiculo.imagenes || [vehiculo.imagen],
    detalles: vehiculo.detalles
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Detail item={vehiculoDetalle} itemType="vehiculo" />
    </main>
  );
}

export async function generateStaticParams() {
  // Leer el archivo JSON para generar paths estáticos
  const dataFilePath = path.join(process.cwd(), 'public', 'data', 'vehiculos.json');
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  return data.vehiculos.map((vehiculo: any) => ({
    id: vehiculo.id.toString(),
  }));
}