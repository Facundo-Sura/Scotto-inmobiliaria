'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PropiedadFormData {
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: string;
  operacion: string;
  direccion: string;
  metros: number;
  habitaciones: number;
}

interface ArchivoSubido {
  url: string;
  nombre: string;
  tipo: 'imagen' | 'video';
  file?: File;
}

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);

  const [formData, setFormData] = useState<PropiedadFormData>({
    titulo: '',
    descripcion: '',
    precio: 0,
    tipo: '',
    operacion: '',
    direccion: '',
    metros: 0,
    habitaciones: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'metros' || name === 'habitaciones' ? Number(value) : value
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

    // Validaciones básicas
    if (!formData.titulo || !formData.direccion || !formData.tipo || !formData.operacion || formData.precio <= 0) {
      setError('Complete los campos obligatorios: título, dirección, tipo, operación y precio mayor a 0.');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Agregar campos del formulario como strings
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precio', formData.precio.toString());
      formDataToSend.append('tipo', formData.tipo);
      formDataToSend.append('operacion', formData.operacion);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('metros', formData.metros.toString());
      formDataToSend.append('habitaciones', formData.habitaciones.toString());

      // Agregar archivos si existen
      const archivosConFile = archivos.filter(archivo => archivo.file);
      
      if (archivosConFile.length > 0) {
        archivosConFile.forEach(archivo => {
          if (archivo.file) {
            formDataToSend.append('archivos', archivo.file);
          }
        });
        console.log(`✅ Enviando ${archivosConFile.length} archivos`);
      } else {
        console.log('ℹ️ Sin archivos para enviar');
      }

      // DEBUG: Mostrar datos que se envían
      console.log('📤 Datos del formulario:', {
        titulo: formData.titulo,
        precio: formData.precio,
        tipo: formData.tipo,
        operacion: formData.operacion,
        direccion: formData.direccion,
        metros: formData.metros,
        habitaciones: formData.habitaciones
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
      
      console.log('🌐 Enviando POST a:', `${apiUrl}/inmobiliaria`);
      
      const response = await fetch(`${apiUrl}/inmobiliaria`, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('📨 Response status:', response.status);
      
      let responseData;
      try {
        responseData = await response.json();
        console.log('📄 Response data:', responseData);
      } catch (parseError) {
        console.error('❌ Error parseando JSON:', parseError);
        const textResponse = await response.text();
        console.error('📝 Response text:', textResponse);
        responseData = { error: 'Error parseando respuesta', raw: textResponse };
      }
      
      if (!response.ok) {
        console.error('🚨 Error del servidor:', responseData);
        
        // Mostrar errores específicos si existen
        if (responseData.detalles && Array.isArray(responseData.detalles)) {
          const errores = responseData.detalles.map((err: any) => 
            err.message || err.msg || JSON.stringify(err)
          ).join(', ');
          throw new Error(`Errores de validación: ${errores}`);
        }
        
        if (responseData.error && responseData.error !== 'Error al crear la propiedad') {
          throw new Error(responseData.error);
        }
        
        if (responseData.message) {
          throw new Error(responseData.message);
        }
        
        throw new Error(responseData.error || `Error ${response.status} del servidor`);
      }

      // Éxito
      console.log('✅ Propiedad creada exitosamente:', responseData);
      
      // Limpiar URLs de previsualización
      archivos.forEach(archivo => URL.revokeObjectURL(archivo.url));
      
      router.push('/admin/inmobiliaria');
      router.refresh();
      
    } catch (err) {
      console.error('💥 Error completo:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al crear la propiedad');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Crear Nueva Propiedad</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
          <br />
          <span className="text-sm">Revisa la consola para más detalles.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECCIÓN ARCHIVOS MULTIMEDIA */}
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
            <p className="text-sm text-blue-600 mt-1">
              {archivos.length} archivo(s) seleccionado(s)
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
                  <div className="p-2 text-xs truncate bg-white">
                    {archivo.nombre}
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
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ej: Casa moderna en zona céntrica"
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
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ej: 150000"
            />
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
              <option value="">Seleccionar tipo</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="local">Local</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Operación *</label>
            <select
              name="operacion"
              value={formData.operacion}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Seleccionar operación</option>
              <option value="venta">Venta</option>
              <option value="alquiler">Alquiler</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Dirección *</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ej: Av. Siempre Viva 123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Metros cuadrados</label>
            <input
              type="number"
              name="metros"
              value={formData.metros}
              onChange={handleInputChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ej: 120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Habitaciones</label>
            <input
              type="number"
              name="habitaciones"
              value={formData.habitaciones}
              onChange={handleInputChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ej: 3"
            />
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
            placeholder="Describa la propiedad..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || subiendoArchivos}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Propiedad'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/admin/inmobiliaria')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}