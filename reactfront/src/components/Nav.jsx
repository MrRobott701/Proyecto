import React from "react";
import { Link, useLocation } from "react-router-dom";
import camIcon from "../images/ico-cam.png";
import camIcon2 from "../images/ico-cam2.png";

const Nav = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Navbar horizontal */}
      <header className="h-16 z-50 fixed">
        <nav className="relative h-full">
          <button
            onClick={handleCollapse}
            className={`text-white text-2xl focus:outline-none absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 z-50 ${
              isCollapsed ? "ml-7" : "ml-48 left-2"
            }`}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
        </nav>
      </header>

      {/* Sidebar vertical con transición */}
      <div
        className={`fixed h-screen bg-gray-800 z-40 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-48"
        }`}
      >
        <div className="px-3 py-3">
          <div className="text-white text-xl font-bold mb-8 mt-1">
            {!isCollapsed && "Panel de Control"}
          </div>
          {isCollapsed && (
            <div className="mt-16"></div>
          )}

          <ul className="space-y-6 text-lg font-bold">
          <li className="relative group">
  <Link
    to="/"
    className={`flex items-center p-2 border rounded ${
      location.pathname === "/"
        ? " border-white text-gray-800 bg-white"
        : " border-black text-white bg-gray-700"
    } hover:border-black`}
    style={{
      boxShadow:
        location.pathname === "/"
          ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
          : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
    }}
  >
    <i
      className={`fa-solid fa-house ${
        location.pathname === "/" ? "text-gray-800" : "text-white"
      } ${isCollapsed ? "mx-auto" : ""}`}
    ></i>
    {!isCollapsed && <span className="ml-4">Inicio</span>}
  </Link>
  
  {/* Tooltip personalizado */}
  <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
  Inicio
</span>

</li>


            <li>
              <Link
                to="/propietarios"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/propietarios"
                    ? "border-white text-gray-800 bg-white"
                    : "border-black text-white bg-gray-700"
                } hover:border-black`}
                title="Propietarios"
                style={{
                  boxShadow:
                    location.pathname === "/propietarios"
                      ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
                      : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
                }}
              >
                <i
                  className={`fa-solid fa-user-tie ${
                    location.pathname === "/propietarios"
                      ? "text-gray-800"
                      : "text-white"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                ></i>
                {!isCollapsed && <span className="ml-4">Propietarios</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/conductores"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/conductores"
                    ? "border-white text-black bg-white"
                    : "border-black text-white bg-gray-700"
                } hover:border-black`}
                title="Conductores"
                style={{
                  boxShadow:
                    location.pathname === "/conductores"
                      ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
                      : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
                }}
              >
                <i
                  className={`fa-solid fa-users-between-lines ${
                    location.pathname === "/conductores"
                      ? "text-gray-800"
                      : "text-white"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                ></i>
                {!isCollapsed && <span className="ml-4">Conductores</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/vehiculos"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/vehiculos"
                    ? "border-white text-gray-800 bg-white"
                    : "border-black text-white bg-gray-700"
                } hover:border-black`}
                title="Vehículos"
                style={{
                  boxShadow:
                    location.pathname === "/vehiculos"
                      ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
                      : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
                }}
              >
                <i
                  className={`fa-solid fa-car-rear ${
                    location.pathname === "/vehiculos"
                      ? "text-gray-800"
                      : "text-white"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                ></i>
                {!isCollapsed && <span className="ml-4">Vehículos</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/contratos"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/contratos"
                    ? "border-white text-gray-800 bg-white"
                    : "border-black text-white bg-gray-700"
                } hover:border-black`}
                title="Contratos"
                style={{
                  boxShadow:
                    location.pathname === "/contratos"
                      ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
                      : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
                }}
              >
                <i
                  className={`fa-solid fa-file-shield ${
                    location.pathname === "/contratos"
                      ? "text-gray-800"
                      : "text-white"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                ></i>
                {!isCollapsed && <span className="ml-4">Contratos</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/cobros"
                className={`flex items-center p-2 border rounded ${
                  location.pathname === "/cobros"
                    ? "border-white text-gray-800 bg-white"
                    : "border-black text-white bg-gray-700"
                } hover:border-black`}
                title="Cobros"
                style={{
                  boxShadow:
                    location.pathname === "/cobros"
                      ? "0px 0px 5px 2px rgba(3, 244, 251, 0.8)"
                      : "0px 0px 5px 2px rgba(101, 101, 101, 0.8)",
                }}
              >
                <i
                  className={`text-xl fa-solid fa-sack-dollar ${
                    location.pathname === "/cobros"
                      ? "text-gray-800"
                      : "text-white"
                  } ${isCollapsed ? "mx-auto" : ""}`}
                ></i>
                {!isCollapsed && <span className="ml-4">Cobros</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer en el sidebar */}
        <div className="absolute bottom-0 w-full py-1 bg-gray-800">
          <a
            href="https://staging.costaensenada.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-2xl items-center justify-center"
          >
            {!isCollapsed && (
              <img src={camIcon} alt="Cam Icon" className="h-12 w-30" />
            )}
          </a>
          {!isCollapsed ? (
            <p className="text-center text-white text-xs mt-2">
              &copy; 2024 Todos los derechos reservados
            </p>
          ) : (
            <img src={camIcon2} alt="Cam Icon" className="ml-3 h-12 w-30" />
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
