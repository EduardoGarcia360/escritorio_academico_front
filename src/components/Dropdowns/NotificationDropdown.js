import React, { useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { useHistory } from "react-router-dom";
import { removeAllCookies } from "services/cookie.js";
import { api } from "services/api";

const NotificationDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const history = useHistory();
  const [hasMounted, setHasMounted] = useState(false);
  const [colegioData, setColegioData] = useState({
    logo: ""
  });
  const [usuarioData, setUsuarioData] = useState({
    nombre_completo: ""
  });
  const urlFileServer = process.env.REACT_APP_URL_FILE_SERVER;
  
  const getColegio = async () => {
    // const response = await api.get('colegios/')
    // console.log('Colegio', response)
    // setColegioData(response.data)
  }

  const getMiUsuario = async () => {
    const response = await api.get('usuarios/miusuario')
    // console.log('Usuario', response)
    setUsuarioData(response.data)
  }

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logout = async () => {
    try {
      // Enviar petición al backend para eliminar la cookie
      const response = await api.logout();
      console.log("logout", response);

      // Limpiar cookies
      removeAllCookies();

      // Redirigir al login
      history.push('/auth/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    if (hasMounted) {
      getColegio();
      getMiUsuario();
    }
  }, [hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <a
        className="text-blueGray-500 block py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48"
        }
      >
        <p className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">{usuarioData.nombre_completo}</p>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#logout"
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
            Cerrar Sesión
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
