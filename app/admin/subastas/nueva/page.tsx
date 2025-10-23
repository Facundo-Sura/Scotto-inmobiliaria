'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SubastaFormData {
  titulo: string;
  descripcion: string;
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState<SubastaFormData>({
    titulo: '',
    descripcion: '',
    precioInicial: 0,
    precioActual: 0,
    fechaInicio: '',
    fechaFin: '',
    estado: 'proximamente',
    categoria: '',
    ofertas: 0,
  });

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    setFormData(prev => ({
      ...prev,
      fechaInicio: today,
      fechaFin: nextWeek
    }));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precioInicial' || name === 'precioActual' || name === 'ofertas' ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (selectedFiles.length === 0) {
      setError('Por favor, selecciona al menos una imagen');
      setLoading(false);
      return;
    }

    if (new Date(formData.fechaFin) <= new Date(formData.fechaInicio)) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precioInicial', formData.precioInicial.toString());
      formDataToSend.append('precioActual', formData.precioActual.toString());
      formDataToSend.append('inicioFecha', new Date(formData.fechaInicio).toISOString());
      formDataToSend.append('finFecha', new Date(formData.fechaFin).toISOString());
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('ofertas', formData.ofertas.toString());
      
      selectedFiles.forEach(file => {
        formDataToSend.append('imagenes', file);
      });

      const apiUrl = 'https://scotto-inmobiliaria-backend.onrender.com/subastas';
      console.log('Enviando datos con', selectedFiles.length, 'imágenes');

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Subasta creada exitosamente:', result);
      
      router.push('/admin/subastas');
      router.refresh();
      
    } catch (err) {
      console.error('❌ Error completo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al crear la subasta');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Subasta</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
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
            <label className="block text-sm font-medium mb-2">Precio Inicial *</label>
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
            <label className="block text-sm font-medium mb-2">Precio Actual *</label>
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
            <label className="block text-sm font-medium mb-2">Categoría *</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="propiedades">Propiedades</option>
              <option value="vehiculos">Vehículos</option>
              <option value="articulos">Artículos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="proximamente">Próximamente</option>
              <option value="activa">Activa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Fecha Inicio *</label>
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
            <label className="block text-sm font-medium mb-2">Fecha Fin *</label>
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
            <label className="block text-sm font-medium mb-2">Ofertas *</label>
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
            <label className="block text-sm font-medium mb-2">Imágenes *</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              {selectedFiles.length > 0 
                ? `${selectedFiles.length} imagen(es) seleccionada(s)` 
                : 'Selecciona una o más imágenes'
              }
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Descripción *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={4}
            required
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
        </div>
      </form>
    </div>
  );
}