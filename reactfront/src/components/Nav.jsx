import React from "react";
import { Link, useLocation } from "react-router-dom";
import camIcon from "../images/ico-cam.png";

const Nav = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Navbar horizontal */}
      <header className="w-full h-16 z-30 fixed top-0">
        <nav className="relative h-full">
          <button
            onClick={handleCollapse}
            className={`text-white text-2xl focus:outline-none absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
              isCollapsed ? " ml-10" : "ml-60 left-2"
            }`}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
        </nav>
      </header>

      {/* Sidebar vertical con transición */}
      <div
        className={`fixed h-screen bg-gray-800 shadow-md z-40 transition-transform duration-300 ease-in-out ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } w-auto`}
      >
        <div className="px-4 py-4 mt-8">
          <div className="text-white text-2xl font-bold mb-8">Panel de Control</div>
          <ul className="space-y-6 text-lg font-bold">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/"
                    ? "border-gray-800 text-gray-800 bg-gray-300"
                    : "border-gray-800 text-gray-300 bg-gray-700"
                } hover:border-gray-300`}
              >
                <i
                  className={`fa-solid fa-house ${
                    location.pathname === "/"
                      ? "text-gray-800"
                      : "text-gray-300"
                  }`}
                ></i>
                <span className={`ml-4 ${isCollapsed ? "" : "block"}`}>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                to="/propietarios"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/propietarios"
                    ? "border-gray-800 text-gray-800 bg-gray-300"
                    : "border-gray-800 text-gray-300 bg-gray-700"
                } hover:border-gray-300`}
              >
                <i
                  className={`fa-solid fa-user-tie ${
                    location.pathname === "/propietarios"
                      ? "text-gray-800"
                      : "text-gray-300"
                  }`}
                ></i>
                <span className={`ml-4 ${isCollapsed ? "" : "block"}`}>Propietarios</span>
              </Link>
            </li>
            <li>
              <Link
                to="/conductores"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/conductores"
                    ? "border-gray-800 text-gray-800 bg-gray-300"
                    : "border-gray-800 text-gray-300 bg-gray-700"
                } hover:border-gray-300`}
              >
                <i
                  className={`fa-solid fa-users-between-lines ${
                    location.pathname === "/conductores"
                      ? "text-gray-800"
                      : "text-gray-300"
                  }`}
                ></i>
                <span className={`ml-4 ${isCollapsed ? "" : "block"}`}>Conductores</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehiculos"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/vehiculos"
                    ? "border-gray-800 text-gray-800 bg-gray-300"
                    : "border-gray-800 text-gray-300 bg-gray-700"
                } hover:border-gray-300`}
              >
                <i
                  className={`fa-duotone fa-solid fa-car-rear ${
                    location.pathname === "/vehiculos"
                      ? "text-gray-800"
                      : "text-gray-300"
                  }`}
                ></i>
                <span className={`ml-4 ${isCollapsed ? "" : "block"}`}>Vehículos</span>
              </Link>
            </li>
          </ul>
        </div>
        

        {/* Footer en el sidebar */}
        <div className="absolute bottom-0 w-full px-4 py-2 bg-gray-800">
          <Link className="flex items-center">
            <img src={camIcon} alt="Cam Icon" className="h-14 w-30"/>
          </Link>
        </div>
      </div>

     
    </>
  );
};

export default Nav;
