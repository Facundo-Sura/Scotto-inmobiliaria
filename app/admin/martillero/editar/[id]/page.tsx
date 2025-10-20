'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

type Vehiculo = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tipo: string;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  caracteristicas: string[];
  imagen: string;
  combustible: string;
  transmision: string;
  color: string;
  puertas: number;
  motor: string;
  cilindrada: string;
};

export default function EditarVehiculo() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState<Vehiculo>({
    id: '',
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    tipo: 'venta',
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    kilometraje: 0,
    caracteristicas: [],
    imagen: '',
    combustible: '',
    transmision: '',
    color: '',
    puertas: 4,
    motor: '',
    cilindrada: '',
  });

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const res = await fetch(`${apiUrl}/martillero/${id}`);
        if (!res.ok) throw new Error('Error al cargar el vehículo');
        const raw = await res.json();
        setFormData({
          id: raw.id ?? raw._id ?? id ?? '',
          titulo: raw.titulo ?? '',
          descripcion: raw.descripcion ?? '',
          precio: Number(raw.precio ?? 0),
          categoria: raw.categoria ?? '',
          tipo: raw.tipo ?? 'venta',
          marca: raw.marca ?? '',
          modelo: raw.modelo ?? '',
          anio: Number(raw.anio ?? raw.año ?? new Date().getFullYear()),
          kilometraje: Number(raw.kilometraje ?? 0),
          caracteristicas: Array.isArray(raw.caracteristicas)
            ? raw.caracteristicas
            : (typeof raw.caracteristicas === 'string' ? raw.caracteristicas.split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          imagen: raw.imagen ?? '',
          combustible: raw.combustible ?? raw.detalles?.combustible ?? '',
          transmision: raw.transmision ?? raw.detalles?.transmision ?? '',
          color: raw.color ?? raw.detalles?.color ?? '',
          puertas: Number(raw.puertas ?? raw.detalles?.puertas ?? 4),
          motor: raw.motor ?? raw.detalles?.motor ?? '',
          cilindrada: raw.cilindrada ?? raw.detalles?.cilindrada ?? '',
        });
      } catch (error) {
        console.error(error);
        setError('No se pudo cargar el vehículo');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchVehiculo();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ['anio', 'kilometraje', 'precio', 'puertas'];
    const parsed = numericFields.includes(name) ? (value === '' ? 0 : Number(value)) : value;
    setFormData(prev => ({
      ...prev,
      [name]: parsed
    }));
  };

  const agregarCaracteristica = () => {
    const v = nuevaCaracteristica.trim();
    if (v && !formData.caracteristicas.includes(v)) {
      setFormData(prev => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, v]
      }));
      setNuevaCaracteristica('');
    }
  };

  const eliminarCaracteristica = (index: number) => {
    setFormData(prev => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!formData.titulo || !formData.marca || !formData.modelo || !formData.categoria || !formData.tipo || formData.precio <= 0) {
      setError('Complete los campos obligatorios: título, marca, modelo, categoría, tipo y precio mayor a 0.');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        titulo: String(formData.titulo),
        descripcion: String(formData.descripcion || ''),
        precio: Number(formData.precio || 0),
        categoria: String(formData.categoria || ''),
        tipo: String(formData.tipo || 'venta'),
        marca: String(formData.marca || ''),
        modelo: String(formData.modelo || ''),
        anio: Number(formData.anio || new Date().getFullYear()),
        año: Number(formData.anio || new Date().getFullYear()),
        kilometraje: Number(formData.kilometraje || 0),
        caracteristicas: Array.isArray(formData.caracteristicas) ? formData.caracteristicas : [],
        imagen: String(formData.imagen || ''),
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

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
      const res = await fetch(`${apiUrl}/martillero/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const respJson = await res.json().catch(() => null);
      if (!res.ok) {
        setError(respJson?.message || respJson?.error || 'Error al actualizar el vehículo');
        return;
      }

      router.push('/admin/martillero');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el vehículo');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Cargando vehículo...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Vehículo</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Precio</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
              <option value="">Seleccionar categoría</option>
              <option value="auto">Auto</option>
              <option value="camioneta">Camioneta</option>
              <option value="moto">Moto</option>
              <option value="camion">Camión</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
              <option value="venta">Venta</option>
              <option value="subasta">Subasta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Marca</label>
            <input type="text" name="marca" value={formData.marca} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Modelo</label>
            <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Año</label>
            <input type="number" name="anio" value={formData.anio} onChange={handleChange} required min={1900} max={new Date().getFullYear() + 1} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kilometraje</label>
            <input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleChange} min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Imagen (URL)</label>
            <input type="url" name="imagen" value={formData.imagen} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Combustible</label>
            <input type="text" name="combustible" value={formData.combustible} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Transmisión</label>
            <input type="text" name="transmision" value={formData.transmision} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Puertas</label>
            <input type="number" name="puertas" value={formData.puertas} onChange={handleChange} min={2} max={5} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Motor</label>
            <input type="text" name="motor" value={formData.motor} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cilindrada</label>
            <input type="text" name="cilindrada" value={formData.cilindrada} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </div>
        {/* Características */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">Características</label>
          <div className="flex gap-2 mb-2">
            <input type="text" value={nuevaCaracteristica} onChange={(e) => setNuevaCaracteristica(e.target.value)} placeholder="Nueva característica" className="w-full p-2 border border-gray-300 rounded" />
            <button type="button" onClick={agregarCaracteristica} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Agregar</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.caracteristicas.map((caracteristica, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
                {caracteristica}
                <button type="button" onClick={() => eliminarCaracteristica(index)} className="ml-2 text-red-500 hover:text-red-700">×</button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <button type="button" onClick={() => router.push('/admin/martillero')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar Vehículo'}
          </button>
        </div>
      </form>
    </div>
  );
}