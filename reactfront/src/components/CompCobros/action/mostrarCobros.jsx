import Encabezado from "../others/Encabezado";
import React, { useState, useEffect } from "react";
import HojaCobros from "./hojaCobros";
import TablaCobros from "./tablaCobros";

const MostrarCobros = (isCollapsed) => {
    const URI_COBROS = "http://localhost:8000/cobros";
    const URI_VEHICULOS = "http://localhost:8000/vehiculos";
    const URI_CONDUCTORES = "http://localhost:8000/conductores/activo";
    const URI_PROPIETARIOS = "http://localhost:8000/propietarios";
    const URI_CONTRATOS = "http://localhost:8000/contratos";

    const [cobros, setCobros] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [propietarios, setPropietarios] = useState([]);
    const [contratos, setContratos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showHojaCobros, setShowHojaCobros] = useState(false); // Nuevo estado para mostrar HojaCobros

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([getCobros(), getVehiculos(), getConductores(), getPropietarios(), getContratos()]);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getCobros = async () => {
        try {
            const response = await fetch(URI_COBROS);
            if (!response.ok) throw new Error("Error al obtener cobros");
            const data = await response.json();
            setCobros(data);
        } catch (error) {
            console.error("Error en getCobros:", error);
        }
    };

    const getVehiculos = async () => {
        try {
            const response = await fetch(URI_VEHICULOS);
            if (!response.ok) throw new Error("Error al obtener vehículos");
            const data = await response.json();
            setVehiculos(data);
        } catch (error) {
            console.error("Error en getVehiculos:", error);
        }
    };

    const getConductores = async () => {
        try {
            const response = await fetch(URI_CONDUCTORES);
            if (!response.ok) throw new Error("Error al obtener conductores");
            const data = await response.json();
            setConductores(data);
        } catch (error) {
            console.error("Error en getConductores:", error);
        }
    };

    const getPropietarios = async () => {
        try {
            const response = await fetch(URI_PROPIETARIOS);
            if (!response.ok) throw new Error("Error al obtener propietarios");
            const data = await response.json();
            setPropietarios(data);
        } catch (error) {
            console.error("Error en getPropietarios:", error);
        }
    };

    const getContratos = async () => {
        try {
            const response = await fetch(URI_CONTRATOS);
            if (!response.ok) throw new Error("Error al obtener contratos");
            const data = await response.json();
            setContratos(data);
        } catch (error) {
            console.error("Error en getContratos:", error);
        }
    };

    if (loading) return <p>Cargando datos...</p>;

    return (
        <>
            {!showHojaCobros && (
                <>
<Encabezado />
      <div className= {`pt-24 mr-12 mb-12 transition-all duration-300 ${
    isCollapsed ? "ml-28" : "ml-28"}`}>
                        {/* Botón para crear Hoja de Cobros */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowHojaCobros(true)} // Al hacer clic, muestra HojaCobros
                        >
                            Crear Hoja de Cobros
                        </button>

                        <h1 className="text-3xl font-bold text-center">Hoja de Cobros</h1>
                        <TablaCobros
                        cobros={cobros}
                        propietarios={propietarios}
                            />


                    </div>
                </>
            )}
            {showHojaCobros && (
                <HojaCobros
                    vehiculos={vehiculos}
                    conductores={conductores}
                    propietarios={propietarios}
                    contratos={contratos}
                    setShowHojaCobros={setShowHojaCobros}
                />
            )}
        </>
    );
};
export default MostrarCobros;