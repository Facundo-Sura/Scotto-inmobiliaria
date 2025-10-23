"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Propiedad = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo: "casa" | "departamento" | "terreno" | "local";
  operacion: "venta" | "alquiler";
  direccion: string;
  habitaciones: number | null;
  metros: number | null;
  imagen: string | null;
  imagenes?: string[];
  tipos_archivos?: string[];
  created_at: string;
  updated_at: string;
};

interface ArchivoSubido {
  url: string;
  nombre: string;
  tipo: 'imagen' | 'video';
  file?: File;
  esNuevo?: boolean;
  urlOriginal?: string;
}

export default function EditarPropiedad() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [formData, setFormData] = useState<Propiedad>({
    id: "",
    titulo: "",
    descripcion: "",
    precio: 0,
    tipo: "casa",
    operacion: "venta",
    direccion: "",
    habitaciones: null,
    metros: null,
    imagen: null,
    imagenes: [],
    tipos_archivos: [],
    created_at: "",
    updated_at: "",
  });

  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subiendoArchivos, setSubiendoArchivos] = useState(false);
  const [error, setError] = useState("");

  // Cargar datos de la propiedad
  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
        const res = await fetch(`${apiUrl}/inmobiliaria/${id}`);

        if (!res.ok) throw new Error("Error al cargar la propiedad");

        const data = await res.json();
        
        // Procesar archivos existentes
        const archivosExistentes: ArchivoSubido[] = [];
        const imagenes = data.imagenes || [];
        const tiposArchivos = data.tipos_archivos || [];
        
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
        } else if (data.imagen) {
          // Compatibilidad con versión anterior (solo una imagen)
          archivosExistentes.push({
            url: data.imagen,
            nombre: 'imagen_principal',
            tipo: 'imagen',
            esNuevo: false,
            urlOriginal: data.imagen
          });
        }

        setArchivos(archivosExistentes);
        setFormData(data);
      } catch (err) {
        setError("No se pudo cargar la propiedad");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropiedad();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "habitaciones" || name === "metros") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? null : parseInt(value),
      }));
    } else if (name === "precio") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
    setError("");

    try {
      const formDataToSend = new FormData();
      
      // Agregar campos del formulario
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precio', formData.precio.toString());
      formDataToSend.append('tipo', formData.tipo);
      formDataToSend.append('operacion', formData.operacion);
      formDataToSend.append('direccion', formData.direccion);
      formDataToSend.append('metros', formData.metros?.toString() || '0');
      formDataToSend.append('habitaciones', formData.habitaciones?.toString() || '0');

      // Agregar solo archivos nuevos
      const archivosNuevos = archivos.filter(archivo => archivo.esNuevo && archivo.file);
      archivosNuevos.forEach(archivo => {
        if (archivo.file) {
          formDataToSend.append('archivos', archivo.file);
        }
      });

      console.log('Actualizando propiedad con:', archivosNuevos.length, 'archivos nuevos');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://scotto-inmobiliaria-backend.onrender.com';
      const res = await fetch(`${apiUrl}/inmobiliaria/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      if (!res.ok) throw new Error("Error al actualizar la propiedad");

      // Limpiar URLs de previsualización de archivos nuevos
      archivos.forEach(archivo => {
        if (archivo.esNuevo) {
          URL.revokeObjectURL(archivo.url);
        }
      });

      alert("Propiedad actualizada correctamente");
      router.push("/admin/inmobiliaria");
      router.refresh();
    } catch (err) {
      setError("Error al actualizar la propiedad");
      console.error("Error:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-2">Cargando propiedad...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Propiedad</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        
        {/* SECCIÓN ARCHIVOS MULTIMEDIA */}
        <div className="mb-6 border rounded-lg p-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Título *
              </label>
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo de Operación *
              </label>
              <select
                name="operacion"
                value={formData.operacion}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tipo de Propiedad *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="terreno">Terreno</option>
                <option value="local">Local Comercial</option>
              </select>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Dirección *
              </label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Habitaciones
                </label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Metros²
                </label>
                <input
                  type="number"
                  name="metros"
                  value={formData.metros || ""}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push("/admin/inmobiliaria")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || subiendoArchivos}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Actualizar Propiedad"}
          </button>
        </div>
      </form>
    </div>
  );
}