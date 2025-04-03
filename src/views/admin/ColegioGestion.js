import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api } from "services/api";
import { getFormatRandomName } from "services/utils";

export default function ColegioGestion() {
  const history = useHistory();
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo_electronico: "",
    pagina_web: "",
    logo: "",
    tipo_colegio: "",
    director: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const urlFileServer = process.env.REACT_APP_URL_FILE_SERVER;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // console.log("Formulario guardado:", formData);
    const response = await api.put('colegios/', formData)
    // console.log('Colegio upd', response)
    if (response.status === 200) {
      if (selectedFile) {
        const imageForm = new FormData();
        imageForm.append("image", selectedFile);
        imageForm.append("filename", selectedFile.name);

        const respFile = await api.doUpload("upload", imageForm);
        console.log("Respuesta de la subida de imagen:", respFile);
      }
      alert(response.data.message);
      history.push("/admin/dashboard");
    } else {
      alert(response.data.message)
    }
  };

  const handleCancel = () => {
    // console.log("Acción cancelada:", formData);
    history.push("/admin/dashboard");
  };

  const getColegio = async () => {
    const response = await api.get('colegios/')
    // console.log('Colegio', response)
    setFormData(response.data)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop();
      const randomName = getFormatRandomName("COLEGIO");
      const finalName = `${randomName}.${extension}`;
      console.log("Nombre de archivo final:", finalName);
  
      setFormData((prev) => ({
        ...prev,
        logo: finalName, // este es el nombre que irá a la base de datos
      }));
  
      // Guardamos el archivo y también su nuevo nombre para luego subirlo
      const renamedFile = new File([file], finalName, { type: file.type });
      setSelectedFile(renamedFile);
    } else {
      setSelectedFile(null);
      setFormData((prev) => ({
        ...prev,
        logo: "", // Limpiamos el nombre si no hay archivo
      }));
    }
  };

  useEffect(() => {
    if (hasMounted) {
      getColegio();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <h1 className="text-2xl font-bold mb-6">Información del Colegio</h1>
        <form id="formColegio" onSubmit={handleSave}>
          {/* Nombre */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre <span className="text-red-500">(*)</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dirección */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="direccion"
            >
              Dirección <span className="text-red-500">(*)</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="direccion"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Teléfono <span className="text-red-500">(*)</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="telefono"
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          {/* Correo Electrónico */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="correo_electronico"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="correo_electronico"
              type="email"
              name="correo_electronico"
              value={formData.correo_electronico}
              onChange={handleChange}
            />
          </div>

          {/* Página Web */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pagina_web"
            >
              Página Web
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pagina_web"
              type="text"
              name="pagina_web"
              value={formData.pagina_web}
              onChange={handleChange}
            />
          </div>

          {/* Tipo de Colegio */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tipo_colegio"
            >
              Tipo de Colegio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tipo_colegio"
              type="text"
              name="tipo_colegio"
              value={formData.tipo_colegio}
              onChange={handleChange}
            />
          </div>

          {/* Director */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="director"
            >
              Director <span className="text-red-500">(*)</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="director"
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {
            (formData.logo) && (<div className="flex justify-center items-center mt-8">
              <div className="flex justify-center items-center overflow-hidden" style={{ maxWidth: '300px', maxHeight: '300px' }}>
                <img
                  src={`${urlFileServer}${formData.logo}`}
                  alt="Logo del colegio"
                  className="object-contain w-auto h-auto max-w-[300px] max-h-[300px]"
                />
              </div>
            </div>)
          }

          {/* Botones */}
          <div className="flex items-center justify-between">
            <button
              className="bg-lightBlue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Guardar
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
