import React, { useState, useEffect } from "react";
import Encabezado from "../others/Encabezado";
import VehiculosView from "./mostrarCarros";
import MetricasCobr from './metricasCobros'
import DocVencimientos from './docVencimientos.jsx';
const Home = ({ isCollapsed }) => {
  // Definir los estados para cada tipo de dato
  const [vehiculos, setVehiculos] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [cobros, setCobros] = useState([]);
  const [conductores, setConductores] = useState([]);

  // URLs de las APIs
  const URI_VEHICULOS = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIOS = "http://localhost:8000/propietarios";
  const URI_COBROS = "http://localhost:8000/cobros";
  const URI_CONDUCTORES = "http://localhost:8000/conductores";

  useEffect(() => {
    // Hacer las solicitudes fetch de manera paralela usando Promise.all
    const fetchData = async () => {
      try {
        const [vehiculosRes, propietariosRes, cobrosRes, conductoresRes] = await Promise.all([
          fetch(URI_VEHICULOS),
          fetch(URI_PROPIETARIOS),
          fetch(URI_COBROS),
          fetch(URI_CONDUCTORES),
        ]);

        const vehiculosData = await vehiculosRes.json();
        const propietariosData = await propietariosRes.json();
        const cobrosData = await cobrosRes.json();
        const conductoresData = await conductoresRes.json();

        // Actualizar el estado con los datos obtenidos
        setVehiculos(vehiculosData);
        setPropietarios(propietariosData);
        setCobros(cobrosData);
        setConductores(conductoresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Llamar a la función fetchData
  }, []); // El arreglo vacío asegura que se ejecute una sola vez al montarse el componente

  console.log(vehiculos, propietarios, cobros, conductores); // Puedes ver los datos obtenidos en la consola

  return (
    <>
      <Encabezado />
      <div className={`pt-24 mr-12 mb-12 z-10 transition-all duration-300 ${isCollapsed ? "ml-28" : "ml-28"}`}>
        {/* Contenedor para los componentes */}
    
          {/* Vehiculos View */}
          <div className=" h-[500px] w-1/2 overflow-auto border rounded-lg">
            <VehiculosView/>
          </div>
          
          {/* Metricas Cobr */}
          <div className="h-[400px] overflow-auto border rounded-lg p-4">
            <MetricasCobr
              cobros={cobros} // Pasar los datos de cobros a MetricasCobr
              propietarios={propietarios} // Pasar los datos de propietarios
              conductores={conductores} // Pasar los datos de conductores
            />
          </div>

          {/* Otros posibles componentes */}
          <div className="h-[400px] overflow-auto border rounded-lg p-4">
            {/* Aquí podrías agregar otro componente si lo deseas */}
            <DocVencimientos vehiculos={vehiculos} />
          </div>
      
      </div>
    </>
  );
};

export default Home;
