import { MetadataRoute } from 'next'

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
  created_at: string;
  updated_at: string;
}

// Función para obtener propiedades desde tu API
async function getPropiedades(): Promise<Propiedad[]> {
  try {
    const res = await fetch('https://scotto-inmobiliaria-backend.onrender.com/inmobiliaria', {
      next: { revalidate: 3600 } // Cache de 1 hora
    });
    
    if (!res.ok) {
      throw new Error('Error al cargar propiedades');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://inmobiliariascotto.com.ar';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Obtener propiedades dinámicamente
  const propiedades = await getPropiedades();
  
  // URLs estáticas principales
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/inmobiliaria`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/martillero`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/subastas`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // URLs dinámicas de propiedades
  const propertyUrls = propiedades.map((propiedad) => ({
    url: `${baseUrl}/inmobiliaria/${propiedad.id}`,
    lastModified: propiedad.updated_at.split('T')[0] || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Combinar todas las URLs
  return [...staticUrls, ...propertyUrls];
}