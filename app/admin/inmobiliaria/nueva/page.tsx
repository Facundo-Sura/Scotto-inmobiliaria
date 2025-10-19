'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PropiedadFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  categoria: string;
  ubicacion: string;
  caracteristicas: string;
  imagen: string;
  superficie: string;
  terreno: string;
  antiguedad: string;
  orientacion: string;
  estado: string;
  servicios: string;
  ambientes: number;
  cocheras: number;
}

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<PropiedadFormData>({
    titulo: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    categoria: '',
    ubicacion: '',
    caracteristicas: '',
    imagen: '',
    superficie: '',
    terreno: '',
    antiguedad: '',
    orientacion: '',
    estado: '',
    servicios: '',
    ambientes: 0,
    cocheras: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'ambientes' || name === 'cocheras' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inmobiliaria`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          caracteristicas: formData.caracteristicas.split(',').map(c => c.trim()).filter(c => c),
          servicios: formData.servicios.split(',').map(s => s.trim()).filter(s => s),
          detalles: {
            superficie: formData.superficie,
            terreno: formData.terreno,
            antiguedad: formData.antiguedad,
            orientacion: formData.orientacion,
            estado: formData.estado,
            servicios: formData.servicios.split(',').map(s => s.trim()).filter(s => s),
            ambientes: formData.ambientes,
            cocheras: formData.cocheras,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la propiedad');
      }

      router.push('/admin/inmobiliaria');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Propiedad</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Precio</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar tipo</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="local">Local</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar categoría</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ubicación</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Imagen URL</label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Superficie</label>
            <input
              type="text"
              name="superficie"
              value={formData.superficie}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Terreno</label>
            <input
              type="text"
              name="terreno"
              value={formData.terreno}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Antigüedad</label>
            <input
              type="text"
              name="antiguedad"
              value={formData.antiguedad}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Orientación</label>
            <input
              type="text"
              name="orientacion"
              value={formData.orientacion}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar estado</option>
              <option value="excelente">Excelente</option>
              <option value="muy-bueno">Muy Bueno</option>
              <option value="bueno">Bueno</option>
              <option value="a-reciclar">A Reciclar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ambientes</label>
            <input
              type="number"
              name="ambientes"
              value={formData.ambientes}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cocheras</label>
            <input
              type="number"
              name="cocheras"
              value={formData.cocheras}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Características (separadas por comas)</label>
          <textarea
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleInputChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="pileta, jardín, garage, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Servicios (separados por comas)</label>
          <textarea
            name="servicios"
            value={formData.servicios}
            onChange={handleInputChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="agua, gas, luz, internet, etc."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Propiedad'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/inmobiliaria')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}