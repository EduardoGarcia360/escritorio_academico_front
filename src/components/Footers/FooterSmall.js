import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()} Notus React by{" "}
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-small"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                >
                  Creative Tim
                </a>
                {` v. ${process.env.REACT_APP_CURRENT_VERSION}`}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
