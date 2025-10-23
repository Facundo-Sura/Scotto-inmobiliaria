'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VehiculoFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tipo: string;
  marca: string;
  modelo: string;
  anio: number;
  kilometraje: number;
  caracteristicas: string;
  combustible: string;
  transmision: string;
  color: string;
  puertas: number;
  motor: string;
  cilindrada: string;
}

interface ArchivoSubido {
  url: string;
  nombre: string;
  tipo: 'imagen' | 'video';
  file?: File;
}

export default function NuevoVehiculoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);

  const [formData, setFormData] = useState<VehiculoFormData>({
    titulo: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    tipo: 'venta',
    marca: '',
    modelo: '',
    anio: new Date().getFullYear(),
    kilometraje: 0,
    caracteristicas: '',
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
      [name]: parsed
    }));
  };

  // Manejar subida de archivos
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
          file
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
      URL.revokeObjectURL(nuevoArray[index].url); // Liberar memoria
      nuevoArray.splice(index, 1);
      return nuevoArray;
    });
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
      const caracteristicasArr = formData.caracteristicas
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);
      
      caracteristicasArr.forEach(caracteristica => {
        formDataToSend.append('caracteristicas', caracteristica);
      });

      // Agregar archivos
      archivos.forEach(archivo => {
        if (archivo.file) {
          formDataToSend.append('archivos', archivo.file);
        }
      });

      console.log('Enviando formulario con archivos:', archivos.length);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com'}/martillero`,
        {
          method: 'POST',
          body: formDataToSend, // ✅ Sin Content-Type header (se setea automáticamente con FormData)
        }
      );

      const resp = await response.json().catch(() => null);
      
      if (!response.ok) {
        console.error('Server error:', resp);
        throw new Error(resp?.error || resp?.message || 'Error al crear el vehículo');
      }

      // Limpiar URLs de previsualización
      archivos.forEach(archivo => URL.revokeObjectURL(archivo.url));
      
      router.push('/admin/martillero');
      router.refresh();
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
        {/* SECCIÓN ARCHIVOS */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Archivos Multimedia</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Subir imágenes y videos (máx. 10 archivos)
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
          </div>

          {/* Previsualización de archivos */}
          {archivos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {archivos.map((archivo, index) => (
                <div key={index} className="relative border rounded-lg overflow-hidden">
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
                  <button
                    type="button"
                    onClick={() => eliminarArchivo(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    ×
                  </button>
                  <div className="p-2 text-xs truncate">
                    {archivo.nombre}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CAMPOS DEL FORMULARIO (MANTENIENDO TU ESTRUCTURA ACTUAL) */}
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
            <label className="block text-sm font-medium mb-2">Precio *</label>
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
            <label className="block text-sm font-medium mb-2">Categoría *</label>
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
            <label className="block text-sm font-medium mb-2">Tipo *</label>
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

          {/* ... MANTENER EL RESTO DE TUS CAMPOS ACTUALES ... */}
          <div>
            <label className="block text-sm font-medium mb-2">Marca *</label>
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
            <label className="block text-sm font-medium mb-2">Modelo *</label>
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
            <label className="block text-sm font-medium mb-2">Año *</label>
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
            disabled={loading || subiendoArchivos}
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