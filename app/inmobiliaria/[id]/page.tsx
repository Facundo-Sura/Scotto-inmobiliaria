import { promises as fs } from 'fs';
import path from 'path';
import Detail from '@/app/components/Detail';
import { PropiedadDetalle } from '@/app/types';

interface PageProps {
  params: { id: string };
}

export default async function PropiedadDetailPage({ params }: PageProps) {
  // Leer el archivo JSON de propiedades
  const dataFilePath = path.join(process.cwd(), 'public', 'data', 'propiedades.json');
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  // Encontrar la propiedad por ID
  const propiedad = data.propiedades.find((p: any) => p.id.toString() === params.id);
  
  if (!propiedad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h1>
          <p className="text-gray-600">La propiedad que buscas no existe.</p>
        </div>
      </div>
    );
  }
  
  // Mapear a la interfaz PropiedadDetalle
  const propiedadDetalle: PropiedadDetalle = {
    id: propiedad.id,
    titulo: propiedad.titulo,
    descripcion: propiedad.descripcion,
    precio: propiedad.precio,
    tipo: propiedad.tipo,
    categoria: propiedad.categoria,
    ubicacion: propiedad.ubicacion,
    caracteristicas: propiedad.caracteristicas,
    imagen: propiedad.imagen,
    imagenes: propiedad.imagenes || [propiedad.imagen],
    detalles: propiedad.detalles
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Detail item={propiedadDetalle} itemType="propiedad" />
    </main>
  );
}

export async function generateStaticParams() {
  // Leer el archivo JSON para generar paths estáticos
  const dataFilePath = path.join(process.cwd(), 'public', 'data', 'propiedades.json');
  const jsonData = await fs.readFile(dataFilePath, 'utf8');
  const data = JSON.parse(jsonData);
  
  return data.propiedades.map((propiedad: any) => ({
    id: propiedad.id.toString(),
  }));
}