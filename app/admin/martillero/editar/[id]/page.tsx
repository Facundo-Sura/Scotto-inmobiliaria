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
  combustible: string;
  transmision: string;
  color: string;
  puertas: number;
  motor: string;
  cilindrada: string;
  imagenes?: string[];
  tipos_archivos?: string[];
};

interface ArchivoSubido {
  url: string;
  nombre: string;
  tipo: 'imagen' | 'video';
  file?: File;
  esNuevo?: boolean;
  urlOriginal?: string;
}

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
    combustible: '',
    transmision: '',
    color: '',
    puertas: 4,
    motor: '',
    cilindrada: '',
    imagenes: [],
    tipos_archivos: []
  });

  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const res = await fetch(`${apiUrl}/martillero/${id}`);
        if (!res.ok) throw new Error('Error al cargar el vehículo');
        const raw = await res.json();
        
        // Procesar archivos existentes
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
          // Compatibilidad con versión anterior (solo una imagen)
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
          combustible: raw.combustible ?? raw.detalles?.combustible ?? '',
          transmision: raw.transmision ?? raw.detalles?.transmision ?? '',
          color: raw.color ?? raw.detalles?.color ?? '',
          puertas: Number(raw.puertas ?? raw.detalles?.puertas ?? 4),
          motor: raw.motor ?? raw.detalles?.motor ?? '',
          cilindrada: raw.cilindrada ?? raw.detalles?.cilindrada ?? '',
          imagenes: raw.imagenes || [],
          tipos_archivos: raw.tipos_archivos || []
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

  // Manejar subida de nuevos archivos
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setSubiendoArchivos(true);
    
    try {
      const nuevosArchivos: ArchivoSubido[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const esVideo = file.type.startsWith('video/');
        
        // Crear URL local para previsualización
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
    } catch (error) {
      setError('Error al procesar archivos');
    } finally {
      setSubiendoArchivos(false);
    }
  };

  const eliminarArchivo = (index: number) => {
    setArchivos(prev => {
      const nuevoArray = [...prev];
      // Solo liberar memoria si es un archivo nuevo (con URL local)
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

    if (!formData.titulo || !formData.marca || !formData.modelo || !formData.categoria || !formData.tipo || formData.precio <= 0) {
      setError('Complete los campos obligatorios: título, marca, modelo, categoría, tipo y precio mayor a 0.');
      setSaving(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Agregar campos del formulario
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precio', formData.precio.toString());
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('tipo', formData.tipo);
      formDataToSend.append('marca', formData.marca);
      formDataToSend.append('modelo', formData.modelo);
      formDataToSend.append('anio', formData.anio.toString());
      formDataToSend.append('kilometraje', formData.kilometraje.toString());
      formDataToSend.append('combustible', formData.combustible);
      formDataToSend.append('transmision', formData.transmision);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('puertas', formData.puertas.toString());
      formDataToSend.append('motor', formData.motor);
      formDataToSend.append('cilindrada', formData.cilindrada);
      
      // Características como array
      formData.caracteristicas.forEach(caracteristica => {
        formDataToSend.append('caracteristicas', caracteristica);
      });

      // Agregar solo archivos nuevos
      const archivosNuevos = archivos.filter(archivo => archivo.esNuevo && archivo.file);
      archivosNuevos.forEach(archivo => {
        if (archivo.file) {
          formDataToSend.append('archivos', archivo.file);
        }
      });

      console.log('Actualizando vehículo con:', archivosNuevos.length, 'archivos nuevos');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
      const res = await fetch(`${apiUrl}/martillero/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const respJson = await res.json().catch(() => null);
      if (!res.ok) {
        setError(respJson?.message || respJson?.error || 'Error al actualizar el vehículo');
        return;
      }

      // Limpiar URLs de previsualización de archivos nuevos
      archivos.forEach(archivo => {
        if (archivo.esNuevo) {
          URL.revokeObjectURL(archivo.url);
        }
      });

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
        
        {/* SECCIÓN ARCHIVOS MULTIMEDIA */}
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

          {/* Previsualización de archivos */}
          {archivos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {archivos.map((archivo, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden group">
                  {archivo.tipo === 'imagen' ? (
                    <img
                      src={archivo.url}
                      alt={`Vista previa ${index + 1}`}
                      className="w-full h-24 object-cover"
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

        {/* CAMPOS DEL FORMULARIO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título *</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Precio *</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} required min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Categoría *</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
              <option value="">Seleccionar categoría</option>
              <option value="auto">Auto</option>
              <option value="camioneta">Camioneta</option>
              <option value="moto">Moto</option>
              <option value="camion">Camión</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tipo *</label>
            <select name="tipo" value={formData.tipo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded">
              <option value="venta">Venta</option>
              <option value="subasta">Subasta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Marca *</label>
            <input type="text" name="marca" value={formData.marca} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Modelo *</label>
            <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Año *</label>
            <input type="number" name="anio" value={formData.anio} onChange={handleChange} required min={1900} max={new Date().getFullYear() + 1} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Kilometraje</label>
            <input type="number" name="kilometraje" value={formData.kilometraje} onChange={handleChange} min={0} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Combustible</label>
            <select name="combustible" value={formData.combustible} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
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
            <select name="transmision" value={formData.transmision} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value="">Seleccionar transmisión</option>
              <option value="manual">Manual</option>
              <option value="automatica">Automática</option>
              <option value="cvt">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Puertas</label>
            <select name="puertas" value={formData.puertas} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
              <option value={2}>2 Puertas</option>
              <option value={3}>3 Puertas</option>
              <option value={4}>4 Puertas</option>
              <option value={5}>5 Puertas</option>
            </select>
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
          <button type="submit" disabled={saving || subiendoArchivos} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar Vehículo'}
          </button>
        </div>
      </form>
    </div>
  );
}