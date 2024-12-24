import React, { useState, useEffect } from "react";
import { api } from "services/api";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Dashboard() {
  const [hasMounted, setHasMounted] = useState(false);

  const getUsuarios = async () => {
    console.log('ENTRA EN USUARIOS')
    const response = await api.get('usuarios/')
    console.log('response', response)
  }

  useEffect(()=>{
    if (hasMounted) {
        getUsuarios()
    }
  }, [hasMounted])

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
