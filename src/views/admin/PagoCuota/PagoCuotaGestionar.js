import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "services/api";
import { getFormatRandomName } from "services/utils";

export default function PagoCuotaGestionar() {
  const { idCiclo, idJornadaCiclo, idGrado, idEstudiante, idCuota } =
    useParams();
  const history = useHistory();

  const [resumenCuota, setResumenCuota] = useState(null);
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [cuentasBancarias, setCuentasBancarias] = useState([]);
  const [formData, setFormData] = useState({
    id_cuenta_colegio: "",
    monto_pagado: "",
    numero_boleta: "",
    fecha_boleta: "",
    imagen_boleta: "",
    fecha_pago: "",
  });
  const [isPaid, setIsPaid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const urlFileServer = process.env.REACT_APP_URL_FILE_SERVER;

  useEffect(() => {
    const fetchResumenCuota = async () => {
      try {
        const response = await api.get(`cuotasestudiante/resumen/${idCuota}`);
        setResumenCuota(response.data);
        if (response.data.estado === "G") {
          setIsPaid(true);
          const pagoResponse = await api.get(
            `pagoscuota/cuotaestudiante/${idCuota}`
          );
          console.log("pagoresponse", pagoResponse);
          setFormData(pagoResponse.data);
        }
      } catch (error) {
        console.error("Error al cargar el resumen de la cuota:", error);
        alert("Ocurrió un error al cargar el resumen de la cuota");
      }
    };

    const fetchDatosEstudiante = async () => {
      try {
        const response = await api.get(`estudiantes/${idEstudiante}`);
        setDatosEstudiante(response.data);
      } catch (error) {
        console.error("Error al cargar los datos del estudiante:", error);
        alert("Ocurrió un error al cargar los datos del estudiante");
      }
    };

    const fetchCuentasBancarias = async () => {
      try {
        const response = await api.get("cuentasbancarias/");
        setCuentasBancarias(response.data || []);
      } catch (error) {
        console.error("Error al cargar las cuentas bancarias:", error);
        alert("Ocurrió un error al cargar las cuentas bancarias");
      }
    };

    fetchResumenCuota();
    fetchDatosEstudiante();
    fetchCuentasBancarias();
  }, [idCuota, idEstudiante]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.id_cuenta_colegio ||
      !formData.monto_pagado ||
      !formData.numero_boleta ||
      !formData.fecha_boleta
    ) {
      alert("Los campos marcados con (*) son obligatorios");
      return;
    }

    const payload = {
      ...formData,
      fecha_pago: new Date().toISOString().split("T")[0],
      id_cuota_estudiante: idCuota,
    };
    console.log('pagos cuota', payload);

    try {
      const response = await api.post("pagoscuota/", payload);
      if (response.status === 200) {
        // Si se subió imagen, enviarla al backend
        if (selectedFile) {
          const imageForm = new FormData();
          imageForm.append("image", selectedFile);
          imageForm.append("filename", selectedFile.name);

          const respFile = await api.doUpload("upload", imageForm); // <-- ajusta si necesitas ruta completa
          console.log("Respuesta de la subida de imagen:", respFile);
        }
        alert("Pago registrado exitosamente");
        history.push(
          `/admin/CuotaEstudiante/CuotaEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/estudiante/${idEstudiante}`
        );
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al registrar el pago:", error);
      alert("Ocurrió un error al registrar el pago");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop();
      const randomName = getFormatRandomName("BOLETA");
      const finalName = `${randomName}.${extension}`;
      console.log("Nombre de archivo final:", finalName);
  
      setFormData((prev) => ({
        ...prev,
        imagen_boleta: finalName, // este es el nombre que irá a la base de datos
      }));
  
      // Guardamos el archivo y también su nuevo nombre para luego subirlo
      const renamedFile = new File([file], finalName, { type: file.type });
      setSelectedFile(renamedFile);
    } else {
      setSelectedFile(null);
      setFormData((prev) => ({
        ...prev,
        imagen_boleta: "", // Limpiamos el nombre si no hay archivo
      }));
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div className="flex flex-wrap -mx-4 mb-4 mt-4">
          {/* Resumen de la Cuota */}
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Resumen de la Cuota</h2>
              {resumenCuota ? (
                <ul className="space-y-2">
                  <li>
                    <span className="font-bold">Período:</span>{" "}
                    {resumenCuota.periodo}
                  </li>
                  <li>
                    <span className="font-bold">Monto:</span>{" "}
                    {resumenCuota.monto}
                  </li>
                  <li>
                    <span className="font-bold">Estado:</span>{" "}
                    <span
                      className={
                        resumenCuota.estado === "P"
                          ? "text-red-500"
                          : resumenCuota.estado === "R"
                          ? "text-orange-500"
                          : "text-emerald-500"
                      }
                    >
                      {resumenCuota.estado === "P"
                        ? "Pendiente"
                        : resumenCuota.estado === "R"
                        ? "Parcial"
                        : "Pagada"}
                    </span>
                  </li>
                  <li>
                    <span className="font-bold">Fecha de Vencimiento:</span>{" "}
                    {resumenCuota.fecha_vencimiento}
                  </li>
                </ul>
              ) : (
                <p>Cargando resumen de la cuota...</p>
              )}
            </div>
          </div>

          {/* Resumen del Estudiante */}
          <div className="w-1/2 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">Resumen del Estudiante</h2>
              {datosEstudiante ? (
                <ul className="space-y-2">
                  <li>
                    <span className="font-bold">Nombre Completo:</span>{" "}
                    {datosEstudiante.nombre_completo}
                  </li>
                  <li>
                    <span className="font-bold">Fecha de Nacimiento:</span>{" "}
                    {datosEstudiante.fecha_nacimiento}
                  </li>
                  <li>
                    <span className="font-bold">Identificación:</span>{" "}
                    {datosEstudiante.identificacion}
                  </li>
                </ul>
              ) : (
                <p>Cargando datos del estudiante...</p>
              )}
            </div>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Formulario de Pago</h2>
          <form id="pago-cuota" onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="id_cuenta_colegio"
                className="block text-sm font-medium text-gray-700"
              >
                Cuenta del Colegio <span className="text-red-500">(*)</span>
              </label>
              <select
                id="id_cuenta_colegio"
                name="id_cuenta_colegio"
                value={formData.id_cuenta_colegio}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled={isPaid}
                required
              >
                <option value="">Seleccione</option>
                {cuentasBancarias.map((cuenta) => (
                  <option
                    key={cuenta.id_cuenta_colegio}
                    value={cuenta.id_cuenta_colegio}
                  >
                    {`${cuenta.nombre_banco} (${cuenta.numero_cuenta})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="monto_pagado"
                className="block text-sm font-medium text-gray-700"
              >
                Monto Pagado <span className="text-red-500">(*)</span>
              </label>
              <input
                type="number"
                step="0.01"
                id="monto_pagado"
                name="monto_pagado"
                value={formData.monto_pagado}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled={isPaid}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="numero_boleta"
                className="block text-sm font-medium text-gray-700"
              >
                Número de Boleta <span className="text-red-500">(*)</span>
              </label>
              <input
                type="number"
                id="numero_boleta"
                name="numero_boleta"
                value={formData.numero_boleta}
                onChange={handleChange}
                maxLength="50"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled={isPaid}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fecha_boleta"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Boleta <span className="text-red-500">(*)</span>
              </label>
              <input
                type="date"
                id="fecha_boleta"
                name="fecha_boleta"
                value={formData.fecha_boleta}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled={isPaid}
                required
              />
            </div>
            {
              !isPaid && (<div className="mb-4">
                <label
                  htmlFor="imagen_boleta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Imagen de la Boleta
                </label>
                <input
                  type="file"
                  id="imagen_boleta"
                  name="imagen_boleta"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  disabled={isPaid}
                />
              </div>)
            }
            {
              (isPaid && formData.imagen_boleta) && (<div className="flex justify-center items-center mt-8">
                <div className="w-[500px] h-[500px] bg-white shadow-md rounded-md flex justify-center items-center overflow-hidden">
                  <img
                    src={`${urlFileServer}${formData.imagen_boleta}`}
                    alt="Imagen de la Boleta"
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>)
            }
            <div className="mb-4">
              <label
                htmlFor="fecha_pago"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Pago
              </label>
              <input
                type="date"
                id="fecha_pago"
                name="fecha_pago"
                value={formData.fecha_pago}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled
              />
            </div>
            <div className={`flex items-center ${isPaid ? 'justify-center' : 'justify-between'}`}>
              {!isPaid && (
                <button
                  type="submit"
                  className="bg-lightBlue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-lightBlue-600"
                >
                  Guardar
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  history.push(
                    `/admin/CuotaEstudiante/CuotaEstudiantePrincipal/${idCiclo}/jornada/${idJornadaCiclo}/grado/${idGrado}/estudiante/${idEstudiante}`
                  )
                }
                className="bg-red-700 text-white font-medium py-2 px-4 rounded-md hover:bg-red-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
