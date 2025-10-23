'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Subasta = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes: string[];
  precioInicial: number;
  precioActual: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
  imagen_public_id?: string;
  imagenes_public_ids?: string[];
};

export default function EditarSubasta() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState<Subasta>({
    id: '',
    titulo: '',
    descripcion: '',
    imagen: '',
    imagenes: [],
    precioInicial: 0,
    precioActual: 0,
    fechaInicio: '',
    fechaFin: '',
    estado: 'proximamente',
    categoria: 'inmuebles',
    ofertas: 0
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubasta = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/subastas/${id}`);
        
        if (!res.ok) throw new Error('Error al cargar la subasta');
        
        const data = await res.json();
        const subastaFormateada = {
          ...data,
          fechaInicio: data.inicioFecha ? new Date(data.inicioFecha).toISOString().split('T')[0] : '',
          fechaFin: data.finFecha ? new Date(data.finFecha).toISOString().split('T')[0] : '',
          imagenes: data.imagenes && Array.isArray(data.imagenes) ? data.imagenes : []
        };
        setFormData(subastaFormateada);
      } catch (err) {
        setError('No se pudo cargar la subasta');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSubasta();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'precioInicial' || name === 'precioActual' || name === 'ofertas') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

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

      console.log('Enviando datos con', selectedFiles.length, 'nuevas imágenes');
      
      const res = await fetch(`https://scotto-inmobiliaria-backend.onrender.com/subastas/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      console.log('Success response:', result);
      
      alert('Subasta actualizada correctamente');
      router.push('/admin/subastas');
      router.refresh();
    } catch (err) {
      console.error('Error completo:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar la subasta');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Cargando subasta...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Subasta</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {formData.imagenes && formData.imagenes.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Imágenes Actuales ({formData.imagenes.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.imagenes.map((imagen, index) => (
              <img 
                key={index}
                src={imagen} 
                alt={`Imagen ${index + 1}`} 
                className="w-24 h-16 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Título *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Precio Inicial *</label>
                <input
                  type="number"
                  name="precioInicial"
                  value={formData.precioInicial}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Precio Actual *</label>
                <input
                  type="number"
                  name="precioActual"
                  value={formData.precioActual}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Estado *</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="proximamente">Próximamente</option>
                <option value="activa">Activa</option>
                <option value="finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Categoría *</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="inmuebles">Inmuebles</option>
                <option value="vehiculos">Vehículos</option>
                <option value="terrenos">Terrenos</option>
                <option value="coleccionables">Coleccionables</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Inicio *</label>
              <input
                type="date"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Fecha de Fin *</label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Ofertas</label>
              <input
                type="number"
                name="ofertas"
                value={formData.ofertas}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                min="0"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Agregar Nuevas Imágenes</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                {selectedFiles.length > 0 
                  ? `${selectedFiles.length} nueva(s) imagen(es) seleccionada(s)` 
                  : 'Opcional: selecciona imágenes para agregar a las existentes'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push('/admin/subastas')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Actualizar Subasta'}
          </button>
        </div>
      </form>
    </div>
  );
}