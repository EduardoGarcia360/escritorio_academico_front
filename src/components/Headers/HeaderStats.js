import React, { useState, useEffect } from "react";
import CardStats from "components/Cards/CardStats.js";
import { api } from "services/api";

export default function HeaderStats() {
  const [hasMounted, setHasMounted] = useState(false);
  const [valores, setValores] = useState({})

  const getDatos = async () => {
    const params = {
      procedureName: "valoresStatusColegio",
      params: ["id_colegio"],
      objParams: {},
    };
    const response = await api.post("execute-procedure", params);
    // console.log('stats', response)
    if (response.status === 200) {
      setValores(response.data.results[0]);
    } else {
      setValores({});
    }
  }

  useEffect(() => {
    if (hasMounted) {
      getDatos();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Estudiantes Inscritos"
                  statTitle={valores.estudiantes_inscritos ?? '0'}
                  statIconName="fas fa-school"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Maestros Activos"
                  statTitle={valores.docentes_activos ?? '0'}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="% Cuotas Pagadas (mes)"
                  statTitle={valores.ptje_cuotas_pagadas ?? '0'}
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Actividades este Mes"
                  statTitle={valores.actividades_mes ?? '0'}
                  statIconName="fas fa-bus"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
