'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VehiculoFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  marca: string;
  modelo: string;
  año: number;
  kilometraje: number;
  caracteristicas: string;
  imagen: string;
  combustible: string;
  transmision: string;
  color: string;
  puertas: number;
  motor: string;
  cilindrada: string;
}

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<VehiculoFormData>({
    titulo: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    kilometraje: 0,
    caracteristicas: '',
    imagen: '',
    combustible: '',
    transmision: '',
    color: '',
    puertas: 4,
    motor: '',
    cilindrada: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'año' || name === 'kilometraje' || name === 'puertas' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/martillero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          caracteristicas: formData.caracteristicas.split(',').map(c => c.trim()).filter(c => c),
          detalles: {
            combustible: formData.combustible,
            transmision: formData.transmision,
            color: formData.color,
            puertas: formData.puertas,
            motor: formData.motor,
            cilindrada: formData.cilindrada,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el vehículo');
      }

      router.push('/admin/martillero');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Vehículo</h1>
      
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
              <option value="auto">Auto</option>
              <option value="camioneta">Camioneta</option>
              <option value="moto">Moto</option>
              <option value="camion">Camión</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Modelo</label>
            <input
              type="text"
              name="modelo"
              value={formData.modelo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Año</label>
            <input
              type="number"
              name="año"
              value={formData.año}
              onChange={handleInputChange}
              required
              min={1900}
              max={new Date().getFullYear() + 1}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kilometraje</label>
            <input
              type="number"
              name="kilometraje"
              value={formData.kilometraje}
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
            <label className="block text-sm font-medium mb-2">Combustible</label>
            <select
              name="combustible"
              value={formData.combustible}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar combustible</option>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
              <option value="electrico">Eléctrico</option>
              <option value="hibrido">Híbrido</option>
              <option value="gnc">GNC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Transmisión</label>
            <select
              name="transmision"
              value={formData.transmision}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar transmisión</option>
              <option value="manual">Manual</option>
              <option value="automatica">Automática</option>
              <option value="cvt">CVT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Puertas</label>
            <select
              name="puertas"
              value={formData.puertas}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={2}>2 Puertas</option>
              <option value={3}>3 Puertas</option>
              <option value={4}>4 Puertas</option>
              <option value={5}>5 Puertas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Motor</label>
            <input
              type="text"
              name="motor"
              value={formData.motor}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="1.6, 2.0, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cilindrada</label>
            <input
              type="text"
              name="cilindrada"
              value={formData.cilindrada}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="1600cc, 2000cc, etc."
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

        <div>
          <label className="block text-sm font-medium mb-2">Características (separadas por comas)</label>
          <textarea
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleInputChange}
            rows={2}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="aire acondicionado, dirección hidráulica, airbag, etc."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Vehículo'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/martillero')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}