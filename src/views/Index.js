/*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Index() {
  const history = useHistory();

  const acceder = async () => {
    history.push('/auth/login');
  };
  
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Escritorio Académico – Plataforma integral para la gestión escolar
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Es una plataforma web moderna diseñada para 
                facilitar la administración de instituciones educativas. 
                Ofrece herramientas intuitivas para el control de estudiantes, 
                docentes, finanzas, transporte y más. Pensado para directores, 
                administrativos y docentes, simplifica los procesos diarios y 
                mejora la toma de decisiones con datos en tiempo real.
              </p>
              <div className="mt-12">
                <a
                  href="#acceder"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    acceder();
                  }}
                >
                  Acceder
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
