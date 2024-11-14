import React, { useState, useEffect } from "react";
import Encabezado from "../others/Encabezado";
import VehiculosView from "./mostrarCarros";
import MetricasCobr from './metricasCobros';
import DocVencimientos from './docVencimientos.jsx';

const Home = ({ isCollapsed }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [cobros, setCobros] = useState([]);
  const [conductores, setConductores] = useState([]);

  const URI_VEHICULOS = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIOS = "http://localhost:8000/propietarios";
  const URI_COBROS = "http://localhost:8000/cobros";
  const URI_CONDUCTORES = "http://localhost:8000/conductores";

  useEffect(() => {
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

        setVehiculos(vehiculosData);
        setPropietarios(propietariosData);
        setCobros(cobrosData);
        setConductores(conductoresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Encabezado />
      <div className={`pt-20 z-10 transition-all duration-300 ${isCollapsed ? "" : "ml-24"}`}>
        <div className="flex justify-between">

  <div className="">
    <DocVencimientos vehiculos={vehiculos} />
  </div>
          {/*VEHICULOS*/}
          <div className="mr-4 ml-5">
            <VehiculosView />
          </div>
          </div>
          
        
      </div>
    </>
  );
};

export default Home;
