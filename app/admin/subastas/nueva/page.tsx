'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SubastaFormData {
  titulo: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
}

export default function NuevaSubastaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<SubastaFormData>({
    titulo: '',
    descripcion: '',
    imagen: '',
    precioInicial: 0,
    precioActual: 0,
    fechaInicio: new Date().toISOString().split('T')[0],
    fechaFin: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    estado: 'proximamente',
    categoria: '',
    ofertas: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precioInicial' || name === 'precioActual' || name === 'ofertas' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subasta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la subasta');
      }

      router.push('/admin/subastas');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Subasta</h1>
      
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
            <label className="block text-sm font-medium mb-2">Precio Inicial</label>
            <input
              type="number"
              name="precioInicial"
              value={formData.precioInicial}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Precio Actual</label>
            <input
              type="number"
              name="precioActual"
              value={formData.precioActual}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
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
              <option value="propiedades">Propiedades</option>
              <option value="vehiculos">Vehículos</option>
              <option value="articulos">Artículos</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="proximamente">Próximamente</option>
              <option value="activa">Activa</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fecha de Inicio</label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fecha de Fin</label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ofertas</label>
            <input
              type="number"
              name="ofertas"
              value={formData.ofertas}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="md:col-span-2">
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Subasta'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/subastas')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}