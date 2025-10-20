'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VehiculoFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string; // renombrado desde 'tipo' a 'categoria' (tipo = operación)
  tipo: string; // nuevo: 'venta' | 'subasta' | 'alquiler'
  marca: string;
  modelo: string;
  anio: number;
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
    categoria: '', // antes 'tipo'
    tipo: 'venta', // por defecto envío 'venta' (cumple validación backend)
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
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
    const name = e.target.name as keyof VehiculoFormData;
    const value = e.target.value;
    const numericFields = ['precio', 'anio', 'kilometraje', 'puertas'];
    const isNumeric = numericFields.includes(name as string);
    const parsed = isNumeric ? (value === '' ? 0 : Number(value)) : value;
    setFormData(prev => ({
      ...prev,
      [name]: parsed as never,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.titulo || !formData.marca || !formData.modelo || !formData.categoria || !formData.tipo || (Number(formData.precio) <= 0)) {
      setError('Complete los campos obligatorios: título, marca, modelo, categoría, tipo y precio mayor a 0.');
      setLoading(false);
      return;
    }

    try {
      const caracteristicasArr = (typeof formData.caracteristicas === 'string')
        ? formData.caracteristicas.split(',').map(c => c.trim()).filter(Boolean)
        : (Array.isArray(formData.caracteristicas) ? formData.caracteristicas : []);

      const payload = {
        titulo: String(formData.titulo),
        descripcion: String(formData.descripcion || ''),
        precio: Number(formData.precio || 0),
        categoria: String(formData.categoria || ''),
        tipo: String(formData.tipo || 'venta'),
        marca: String(formData.marca || ''),
        modelo: String(formData.modelo || ''),
        anio: Number(formData.anio || new Date().getFullYear()),
        // compatibilidad con backend que use 'año'
        año: Number(formData.anio || new Date().getFullYear()),
        kilometraje: Number(formData.kilometraje || 0),
        caracteristicas: caracteristicasArr,
        imagen: String(formData.imagen || ''),
        // Enviar detalles tanto dentro de 'detalles' como en top-level (compatibilidad)
        combustible: String(formData.combustible || ''),
        transmision: String(formData.transmision || ''),
        color: String(formData.color || ''),
        puertas: Number(formData.puertas || 0),
        motor: String(formData.motor || ''),
        cilindrada: String(formData.cilindrada || ''),
        detalles: {
          combustible: String(formData.combustible || ''),
          transmision: String(formData.transmision || ''),
          color: String(formData.color || ''),
          puertas: Number(formData.puertas || 0),
          motor: String(formData.motor || ''),
          cilindrada: String(formData.cilindrada || ''),
        }
      };

      console.log('POST /martillero payload:', payload);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com'}/martillero`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resp = await response.json().catch(() => null);
      if (!response.ok) {
        console.error('Server error body:', resp);
        throw new Error(resp?.message || resp?.error || JSON.stringify(resp) || 'Error al crear el vehículo');
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
            <label className="block text-sm font-medium mb-2">Categoría (vehículo)</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar categoría</option>
              <option value="auto">Auto</option>
              <option value="camioneta">Camioneta</option>
              <option value="moto">Moto</option>
              <option value="camion">Camión</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipo (operación)</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="venta">Venta</option>
              <option value="subasta">Subasta</option>
              <option value="alquiler">Alquiler</option>
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
              name="anio"
              value={formData.anio}
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