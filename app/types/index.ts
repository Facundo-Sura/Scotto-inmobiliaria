// Interfaces para propiedades
export interface PropiedadDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  categoria: string;
  ubicacion: string;
  caracteristicas: string[];
  imagen: string;
  imagenes?: string[];
  detalles?: {
    superficie: string;
    terreno: string;
    antiguedad: string;
    orientacion: string;
    estado: string;
    servicios: string[];
    ambientes: number;
    cocheras: number;
  };
}

// Interfaces para vehículos
export interface VehiculoDetalle {
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
  imagenes?: string[];
  detalles?: {
    combustible: string;
    transmision: string;
    color: string;
    puertas: number;
    motor: string;
    cilindrada: string;
  };
}

// Tipo unión para el componente Detail
export type ItemDetalle = PropiedadDetalle | VehiculoDetalle;

// Tipo para identificar el tipo de item
export type ItemTipo = 'propiedad' | 'vehiculo';