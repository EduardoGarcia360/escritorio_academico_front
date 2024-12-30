import React, { useState, useEffect } from "react";
import { api } from "services/api";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  // Función para verificar si el token existe en las cookies
  const checkToken = async () => {
    const response = await api.validateLogin()
    // console.log('RESPONSE CHECK TOKEN', response)
    if (response.data.status === 'OK') {
      history.push("/admin/dashboard");
    }
  };

  const doLogin = async (e) => {
    e.preventDefault();
    const credenciales = { nombre_usuario, contrasena };
    // console.log("LOGIN", credenciales);
    const response = await api.login(credenciales);
    // console.log("response", response);
    if (response.data.status === "OK") {
      history.push("/admin/dashboard");
    }
  };

  useEffect(() => {
    if (hasMounted) {
      checkToken();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-6 font-bold"></div>
                <form onSubmit={doLogin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Usuario
                    </label>
                    <input
                      value={nombre_usuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Usuario"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contraseña
                    </label>
                    <input
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
