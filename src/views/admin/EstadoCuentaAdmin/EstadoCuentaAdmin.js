import React, { useState, useEffect } from "react";
import { api } from "services/api";
import { adjustDate } from "services/utils";
import { getFormatRandomName } from "services/utils";
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.addVirtualFileSystem(pdfFonts);

export default function EstadoCuentaAdmin() {
  const [ciclo, setCiclo] = useState(null);
  const [jornadas, setJornadas] = useState([]);
  const [grados, setGrados] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);

  const [idJornada, setIdJornada] = useState("");
  const [idGrado, setIdGrado] = useState("");
  const [idEstudiante, setIdEstudiante] = useState("");

  const [estadoCuenta, setEstadoCuenta] = useState([]);
  const urlFileServer = process.env.REACT_APP_URL_FILE_SERVER;
  const plataformaId = process.env.REACT_APP_PLATAFORMA_ID;

  useEffect(() => {
    const fetchCicloVigente = async () => {
      try {
        const response = await api.get("ciclosescolares/vigente");
        setCiclo(response.data);
        fetchJornadas(response.data.id_ciclo);
      } catch (error) {
        console.error("Error al obtener ciclo escolar vigente:", error);
      }
    };

    fetchCicloVigente();
  }, []);

  const fetchJornadas = async (idCiclo) => {
    try {
      const params = {
        procedureName: "listadoJornadaCicloEscolar",
        params: ["id_ciclo"],
        objParams: { id_ciclo: idCiclo },
      };
      const response = await api.post("execute-procedure", params);
      setJornadas(response.data.results);
    } catch (error) {
      console.error("Error al obtener jornadas:", error);
    }
  };

  const fetchGrados = async (idJornada) => {
    try {
      const response = await api.get(`grados/jornadaciclo/${idJornada}`);
      setGrados(response.data);
    } catch (error) {
      console.error("Error al obtener grados:", error);
    }
  };

  const fetchEstudiantes = async (idGrado) => {
    try {
      const params = {
        procedureName: "listadoEstudiantesPorGrado",
        params: ["id_grado", "id_colegio"],
        objParams: { id_grado: idGrado },
      };
      const response = await api.post("execute-procedure", params);
      setEstudiantes(response.data.results);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const handleBuscar = async () => {
    try {
      const params = {
        procedureName: "estadocuentaestudiante",
        params: ["id_colegio", "id", "id_estudiante"],
        objParams: { id_estudiante: idEstudiante },
      };
        console.log("params", params)
      const response = await api.post("execute-procedure", params);
      console.log("buscar", response)
      if (response.status === 200) {
        setEstadoCuenta(response.data.results);
      } else {
        setEstadoCuenta([]);
      }
    } catch (error) {
      console.error("Error al buscar estado de cuenta:", error);
    }
  };

  const renderEstado = (estado) => {
    let colorClass = "";
    let descripcion = "";
    switch (estado) {
      case "P":
        colorClass = "text-red-500";
        descripcion = "Pendiente";
        break;
      case "R":
        colorClass = "text-orange-500";
        descripcion = "Parcial";
        break;
      case "G":
        colorClass = "text-emerald-500";
        descripcion = "Pagada";
        break;
      default:
        descripcion = "Desconocido";
    }
    return (
      <span className="flex items-center">
        <i className={`fas fa-circle ${colorClass} mr-2`}></i>
        {descripcion}
      </span>
    );
  };

  const generarPDF = async () => {
    if (estadoCuenta.length === 0) {
      alert("No hay valores consultados.");
      return;
    }

    // se consultan los valores para el pdf
    const params = {
      procedureName: "valoresEstudianteColegioEstadoCuentaPadre",
      params: ["id_estudiante", "id_colegio"],
      objParams: { id_estudiante: idEstudiante },
    };
    const response = await api.post("execute-procedure", params);
    console.log('generarPDF', response);

    if (response.status !== 200) {
      alert("No se pudieron obtener los valores para el PDF.");
      return;
    }

    const values = response.data.results[0];
  
    const body = [
      [
        "Periodo",
        "Monto",
        "Estado",
        "Fecha Venc.",
        "Monto Pagado",
        "Fecha Pago",
        "No. Boleta",
        "Fecha Boleta",
      ],
      ...estadoCuenta.map((cuota) => [
        cuota.periodo,
        cuota.monto,
        {
          text:
            cuota.estado === "P"
              ? "Pendiente"
              : cuota.estado === "R"
              ? "Parcial"
              : cuota.estado === "G"
              ? "Pagada"
              : "Desconocido",
          color:
            cuota.estado === "P"
              ? "red"
              : cuota.estado === "G"
              ? "green"
              : cuota.estado === "R"
              ? "orange"
              : "black",
        },
        adjustDate(cuota.fecha_vencimiento),
        {
          text: cuota.monto_pagado || "",
          fillColor: cuota.monto_pagado ? "#fde68a" : null,
        },
        {
          text: adjustDate(cuota.fecha_pago),
          fillColor: cuota.fecha_pago ? "#fde68a" : null,
        },
        {
          text: cuota.numero_boleta || "",
          fillColor: cuota.numero_boleta ? "#bae6fd" : null,
        },
        {
          text: adjustDate(cuota.fecha_boleta),
          fillColor: cuota.fecha_boleta ? "#bae6fd" : null,
        },
      ]),
    ];
  
    const docDefinition = {
      content: [
        { text: "Estado de Cuenta", style: "titulo" },
  
        {
          columns: [
            {
              width: "50%",
              stack: [
                {
                  image: "fotoEstudiante",
                  width: 100,
                  height: 100,
                  alignment: "left",
                  margin: [0, 0, 0, 5],
                },
                { text: `Estudiante: ${values.estudiante_nombre}`, style: "info" },
                { text: `Grado: ${values.grado}`, style: "info" },
              ],
            },
            {
              width: "50%",
              stack: [
                {
                  image: "logoColegio",
                  width: 100,
                  height: 100,
                  alignment: "right",
                  margin: [0, 0, 0, 5],
                },
                { text: `Colegio: ${values.colegio_nombre}`, style: "info", alignment: "right" },
                { text: `Teléfono: ${values.colegio_telefono}`, style: "info", alignment: "right" },
                { text: `${values.colegio_correo}`, style: "info", alignment: "right" },
              ],
            },
          ],
          margin: [0, 0, 0, 10],
        },
  
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*", "*", "*", "*", "*", "*"],
            body,
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        titulo: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        info: {
          fontSize: 10,
          margin: [0, 2, 0, 2],
        },
      },
      images: {
        logoColegio: `${urlFileServer}${values.colegio_logo}`,
        fotoEstudiante: `${urlFileServer}${values.estudiante_fotografia}`,
      },
      defaultStyle: {
        fontSize: 9,
      },
    };
  
    const nombreArchivo = getFormatRandomName("estado_cuenta_admin");
    pdfMake.createPdf(docDefinition).download(`${nombreArchivo}.pdf`);
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 p-6">
        <div className="p-6 bg-blueGray-100 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-blueGray-700 mb-4">Estado de Cuenta - Admin</h3>
      {ciclo && (
        <div className="mb-6 text-blueGray-700">
          Ciclo Escolar Vigente: <strong>{ciclo.nombre}</strong> ({adjustDate(ciclo.fecha_inicio)} - {adjustDate(ciclo.fecha_fin)})
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <select
          className="border px-4 py-2 rounded"
          value={idJornada}
          onChange={(e) => {
            setIdJornada(e.target.value);
            setIdGrado("");
            setIdEstudiante("");
            setGrados([]);
            setEstudiantes([]);
            fetchGrados(e.target.value);
          }}
        >
          <option value="">Seleccione Jornada</option>
          {jornadas.map((j) => (
            <option key={j.id_jornada_ciclo} value={j.id_jornada_ciclo}>
              {j.desc_jornada}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={idGrado}
          onChange={(e) => {
            setIdGrado(e.target.value);
            setIdEstudiante("");
            setEstudiantes([]);
            fetchEstudiantes(e.target.value);
          }}
          disabled={!idJornada}
        >
          <option value="">Seleccione Grado</option>
          {grados.map((g) => (
            <option key={g.id_grado} value={g.id_grado}>
              {g.nombre} ({g.seccion})
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded"
          value={idEstudiante}
          onChange={(e) => setIdEstudiante(e.target.value)}
          disabled={!idGrado}
        >
          <option value="">Seleccione Estudiante</option>
          {estudiantes.map((e) => (
            <option key={e.id_estudiante} value={e.id_estudiante}>
              {e.nombre_completo}
            </option>
          ))}
        </select>

        <button
          className="bg-lightBlue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={handleBuscar}
        >
          <i className="fas fa-search mr-2"></i> Buscar
        </button>
        {
          plataformaId === "1" && (<button
            className="bg-emerald-500 text-white px-4 py-2 rounded flex items-center"
            onClick={generarPDF}
          >
            <i className="fas fa-file-pdf mr-2"></i> Descargar PDF
          </button>)
        }
      </div>

      <div className="block w-full overflow-x-auto">
        <table className="w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {['Periodo','Monto','Estado','Fecha Vencimiento','Monto Pagado','Fecha Pago','Número Boleta','Fecha Boleta'].map((th) => (
                <th key={th} className="px-6 py-3 text-xs uppercase font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {estadoCuenta.map((cuota) => (
              <tr key={cuota.id_cuota_estudiante}>
                <td className="border-t-0 px-6 py-4 text-xs">{cuota.periodo}</td>
                <td className="border-t-0 px-6 py-4 text-xs">{cuota.monto}</td>
                <td className="border-t-0 px-6 py-4 text-xs">{renderEstado(cuota.estado)}</td>
                <td className="border-t-0 px-6 py-4 text-xs">{adjustDate(cuota.fecha_vencimiento)}</td>
                <td className={`border-t-0 px-6 py-4 text-xs ${cuota.monto_pagado ? 'bg-orange-200' : ''}`}>{cuota.monto_pagado}</td>
                <td className={`border-t-0 px-6 py-4 text-xs ${cuota.fecha_pago ? 'bg-orange-200' : ''}`}>{adjustDate(cuota.fecha_pago)}</td>
                <td className={`border-t-0 px-6 py-4 text-xs ${cuota.numero_boleta ? 'bg-lightBlue-200' : ''}`}>{cuota.numero_boleta}</td>
                <td className={`border-t-0 px-6 py-4 text-xs ${cuota.fecha_boleta ? 'bg-lightBlue-200' : ''}`}>{adjustDate(cuota.fecha_boleta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
