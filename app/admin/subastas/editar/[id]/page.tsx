'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Datos de ejemplo para subastas
const subastasEjemplo = [
  {
    id: 1,
    titulo: 'Subasta de Arte Contemporáneo',
    descripcion: 'Obras de artistas contemporáneos nacionales e internacionales',
    categoria: 'arte',
    fechaFin: '2024-12-15',
    precioInicial: 2500,
    imagen: '',
    estado: 'activa'
  },
  {
    id: 2,
    titulo: 'Subasta de Antigüedades',
    descripcion: 'Muebles y objetos antiguos de gran valor histórico',
    categoria: 'antigüedades',
    fechaFin: '2024-11-30',
    precioInicial: 1200,
    imagen: '',
    estado: 'activa'
  }
];

export default function EditarSubastaPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'arte',
    fechaFin: '',
    precioInicial: '',
    imagen: '',
    estado: 'activa'
  });

  useEffect(() => {
    // Simular carga de datos de la subasta
    const subasta = subastasEjemplo.find(s => s.id === id);
    if (subasta) {
      setFormData({
        titulo: subasta.titulo,
        descripcion: subasta.descripcion,
        categoria: subasta.categoria,
        fechaFin: subasta.fechaFin,
        precioInicial: subasta.precioInicial.toString(),
        imagen: subasta.imagen,
        estado: subasta.estado
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar la subasta en la base de datos
    console.log('Actualizando subasta:', formData);
    
    // Simular actualización exitosa
    alert('Subasta actualizada exitosamente');
    router.push('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Editar Subasta #{id}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-2">
                Título de la Subasta
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ej: Subasta de Arte Contemporáneo"
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe los artículos que se subastarán..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="arte">Arte</option>
                  <option value="antigüedades">Antigüedades</option>
                  <option value="joyería">Joyería</option>
                  <option value="vehículos">Vehículos</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Finalización
                </label>
                <input
                  type="date"
                  id="fechaFin"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="precioInicial" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Inicial ($)
                </label>
                <input
                  type="number"
                  id="precioInicial"
                  name="precioInicial"
                  value={formData.precioInicial}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-2">
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  id="imagen"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="activa">Activa</option>
                <option value="finalizada">Finalizada</option>
                <option value="programada">Programada</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/admin')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Actualizar Subasta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}