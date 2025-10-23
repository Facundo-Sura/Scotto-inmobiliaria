'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

type Subasta = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  imagenes: string[];
  tipos_archivos: string[];
  inicioFecha: string;
  finFecha: string;
  precioInicial: number;
  precioActual: number;
  estado: 'activa' | 'proximamente' | 'finalizada';
  categoria: string;
  ofertas: number;
};

interface ArchivoSubido {
  url: string;
  nombre: string;
  tipo: 'imagen' | 'video';
  file?: File;
  esNuevo?: boolean;
  urlOriginal?: string;
}

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
    tipos_archivos: [],
    inicioFecha: '',
    finFecha: '',
    precioInicial: 0,
    precioActual: 0,
    estado: 'proximamente',
    categoria: '',
    ofertas: 0,
  });

  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubasta = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const res = await fetch(`${apiUrl}/subastas/${id}`);
        if (!res.ok) throw new Error('Error al cargar la subasta');
        const raw = await res.json();
        
        const archivosExistentes: ArchivoSubido[] = [];
        const imagenes = raw.imagenes || [];
        const tiposArchivos = raw.tipos_archivos || [];
        
        if (imagenes.length > 0) {
          imagenes.forEach((url: string, index: number) => {
            const tipo = tiposArchivos[index] === 'video' ? 'video' : 'imagen';
            const nombre = tipo === 'video' ? 'video_' + (index + 1) : 'imagen_' + (index + 1);
            
            archivosExistentes.push({
              url,
              nombre,
              tipo,
              esNuevo: false,
              urlOriginal: url
            });
          });
        } else if (raw.imagen) {
          archivosExistentes.push({
            url: raw.imagen,
            nombre: 'imagen_principal',
            tipo: 'imagen',
            esNuevo: false,
            urlOriginal: raw.imagen
          });
        }

        setArchivos(archivosExistentes);
        setFormData({
          id: raw.id ?? '',
          titulo: raw.titulo ?? '',
          descripcion: raw.descripcion ?? '',
          imagen: raw.imagen ?? '',
          imagenes: raw.imagenes || [],
          tipos_archivos: raw.tipos_archivos || [],
          inicioFecha: raw.inicioFecha ? new Date(raw.inicioFecha).toISOString().split('T')[0] : '',
          finFecha: raw.finFecha ? new Date(raw.finFecha).toISOString().split('T')[0] : '',
          precioInicial: Number(raw.precioInicial ?? 0),
          precioActual: Number(raw.precioActual ?? 0),
          estado: raw.estado ?? 'proximamente',
          categoria: raw.categoria ?? '',
          ofertas: Number(raw.ofertas ?? 0),
        });
      } catch (err) {
        console.error('Error cargando subasta:', err);
        setError('No se pudo cargar la subasta');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSubasta();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ['precioInicial', 'precioActual', 'ofertas'];
    const parsed = numericFields.includes(name) ? (value === '' ? 0 : Number(value)) : value;
    setFormData(prev => ({
      ...prev,
      [name]: parsed
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setSubiendoArchivos(true);
    
    try {
      const nuevosArchivos: ArchivoSubido[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const esVideo = file.type.startsWith('video/');
        
        const url = URL.createObjectURL(file);
        
        nuevosArchivos.push({
          url,
          nombre: file.name,
          tipo: esVideo ? 'video' : 'imagen',
          file,
          esNuevo: true
        });
      }
      
      setArchivos(prev => [...prev, ...nuevosArchivos]);
    } catch (err) {
      console.error('Error procesando archivos:', err);
      setError('Error al procesar archivos');
    } finally {
      setSubiendoArchivos(false);
    }
  };

  const eliminarArchivo = (index: number) => {
    setArchivos(prev => {
      const nuevoArray = [...prev];
      if (nuevoArray[index].esNuevo) {
        URL.revokeObjectURL(nuevoArray[index].url);
      }
      nuevoArray.splice(index, 1);
      return nuevoArray;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!formData.titulo || !formData.descripcion || !formData.inicioFecha || !formData.finFecha || formData.precioInicial <= 0) {
      setError('Complete los campos obligatorios: título, descripción, fechas y precio inicial mayor a 0.');
      setSaving(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('inicioFecha', new Date(formData.inicioFecha).toISOString());
      formDataToSend.append('finFecha', new Date(formData.finFecha).toISOString());
      formDataToSend.append('precioInicial', formData.precioInicial.toString());
      formDataToSend.append('precioActual', formData.precioActual.toString());
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('ofertas', formData.ofertas.toString());

      const archivosNuevos = archivos.filter(archivo => archivo.esNuevo && archivo.file);
      archivosNuevos.forEach(archivo => {
        if (archivo.file) {
          formDataToSend.append('archivos', archivo.file);
        }
      });

      console.log('Actualizando subasta con:', archivosNuevos.length, 'archivos nuevos');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
      const res = await fetch(`${apiUrl}/subastas/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const respJson = await res.json().catch(() => null);
      if (!res.ok) {
        setError(respJson?.message || respJson?.error || 'Error al actualizar la subasta');
        return;
      }

      archivos.forEach(archivo => {
        if (archivo.esNuevo) {
          URL.revokeObjectURL(archivo.url);
        }
      });

      router.push('/admin/subastas');
      router.refresh();
    } catch (err) {
      console.error('Error actualizando subasta:', err);
      setError(err instanceof Error ? err.message : 'Error al actualizar la subasta');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Cargando subasta...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Subasta</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Archivos Multimedia</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Agregar nuevas imágenes/videos (máx. 10 archivos total)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              disabled={subiendoArchivos || archivos.length >= 10}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              Formatos: JPG, PNG, GIF, WEBP, MP4, MOV, AVI, MKV, WEBM (máx. 100MB por archivo)
            </p>
            <p className="text-sm text-blue-600 mt-1">
              Archivos actuales: {archivos.length} / 10
            </p>
          </div>

          {archivos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {archivos.map((archivo, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden group">
                  {archivo.tipo === 'imagen' ? (
                    <Image
                      src={archivo.url}
                      alt={`Vista previa ${index + 1}`}
                      width={100}
                      height={96}
                      className="w-full h-24 object-cover"
                      unoptimized
                    />
                  ) : (
                    <video
                      src={archivo.url}
                      className="w-full h-24 object-cover"
                      muted
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => eliminarArchivo(index)}
                      className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-2 text-xs truncate bg-white">
                    {archivo.nombre}
                    {archivo.esNuevo && (
                      <span className="ml-1 text-green-600 font-semibold">(nuevo)</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descripción *</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Precio Inicial *</label>
            <input type="number" name="precioInicial" value={formData.precioInicial} onChange={handleChange} required min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Precio Actual</label>
            <input type="number" name="precioActual" value={formData.precioActual} onChange={handleChange} min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fecha Inicio *</label>
            <input type="date" name="inicioFecha" value={formData.inicioFecha} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fecha Fin *</label>
            <input type="date" name="finFecha" value={formData.finFecha} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="proximamente">Próximamente</option>
              <option value="activa">Activa</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoría</label>
            <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ofertas</label>
            <input type="number" name="ofertas" value={formData.ofertas} onChange={handleChange} min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button type="button" onClick={() => router.push('/admin/subastas')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancelar</button>
          <button type="submit" disabled={saving || subiendoArchivos} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar Subasta'}
          </button>
        </div>
      </form>
    </div>
  );
}