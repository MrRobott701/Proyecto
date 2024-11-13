import React, { useEffect, useState } from "react";
import axios from "axios";
import DateSelector from "./DateSelector"; // Importa el componente DateSelector
import Swal from "sweetalert2";

const TablaCobros = () => {
    const [cobros, setCobros] = useState([]); // Estado para almacenar los cobros
    const [filteredCobros, setFilteredCobros] = useState([]); // Estado para cobros filtrados
    const [conductores, setConductores] = useState([]); // Estado para los conductores
    const [propietarios, setPropietarios] = useState([]); // Estado para los propietarios
    const [fechaInicio, setFechaInicio] = useState(""); // Fecha de inicio
    const [fechaFin, setFechaFin] = useState(""); // Fecha de fin
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const URI_COBROS = "http://localhost:8000/cobros/";
    const URI_CONDUCTORES = "http://localhost:8000/conductores/";
    const URI_PROPIETARIOS = "http://localhost:8000/propietarios/";

    // Obtener los cobros, conductores y propietarios registrados al cargar el componente
    useEffect(() => {
        const fetchCobros = async () => {
            try {
                const response = await axios.get(URI_COBROS);
                setCobros(response.data); // Almacena todos los cobros en el estado
                if (fechaInicio && fechaFin) {
                    // Si las fechas ya están seleccionadas, filtrar cobros al cargar los datos
                    filterCobros(fechaInicio, fechaFin, response.data, searchTerm);
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los cobros.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            }
        };

        const fetchConductores = async () => {
            try {
                const response = await axios.get(URI_CONDUCTORES);
                setConductores(response.data); // Almacena los conductores
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los conductores.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            }
        };

        const fetchPropietarios = async () => {
            try {
                const response = await axios.get(URI_PROPIETARIOS);
                setPropietarios(response.data); // Almacena los propietarios
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los propietarios.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            }
        };

        // Llamar a todas las funciones de obtención de datos
        fetchCobros();
        fetchConductores();
        fetchPropietarios();
    }, [fechaInicio, fechaFin, searchTerm]); // Filtrar cobros al cambiar las fechas o el término de búsqueda

    // Función que maneja el cambio de fechas
    const handleFechaChange = (inicio, fin) => {
        // Convertir la fecha 'inicio' y 'fin' de formato 'DD/MM/YYYY' a 'YYYY-MM-DD'
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        };

        const Finicio = parseDate(inicio);
        const Ffin = parseDate(fin);

        setFechaInicio(Finicio);
        setFechaFin(Ffin);

        // Filtrar los cobros según las fechas seleccionadas
        filterCobros(Finicio, Ffin, cobros, searchTerm);
    };
// Función para filtrar los cobros según las fechas y el término de búsqueda
const filterCobros = (Finicio, Ffin, cobros, searchTerm) => {
    const filtered = cobros.filter((cobro) => {
        const cobroFechaInicio = cobro.fechaInicio ? new Date(cobro.fechaInicio) : null;
        const cobroFechaFin = cobro.fechaFin ? new Date(cobro.fechaFin) : null;

        // Excluir los cobros con fechaFin nula
        if (cobroFechaFin === null || cobroFechaInicio === null) return false;

        // Comparar las fechas
        const fechaValida =
            cobroFechaInicio >= Finicio && cobroFechaFin <= Ffin;

        // Filtrar también por el término de búsqueda (nombre del conductor)
        const conductorValido =
            searchTerm === "" ||
            conductores
                .find((conductor) => conductor.id === cobro.idConductor) // Encontramos al conductor por su id
                ?.nombre.toLowerCase().includes(searchTerm.toLowerCase()); // Filtramos por el nombre

        return fechaValida && conductorValido;
    });

    setFilteredCobros(filtered); // Actualizar el estado con los cobros filtrados
};


    // Función para obtener el nombre del conductor por su ID
    const getConductorNombre = (id) => {
        const conductor = conductores.find((conductor) => conductor.id === id);
        return conductor ? conductor.nombre : "Desconocido";
    };

    // Función para obtener el nombre del propietario por su ID
    const getPropietarioNombre = (id) => {
        const propietario = propietarios.find((propietario) => propietario.id === id);
        return propietario ? propietario.nombre : "Desconocido";
    };

    // Función que maneja el cambio en el campo de búsqueda
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-4">Cobros Registrados</h1>
            {/* Componente DateSelector para seleccionar el rango de fechas */}
            <DateSelector onFechaChange={handleFechaChange} onSearchChange={handleSearchChange} />

            {/* Tabla para mostrar los cobros filtrados */}
            <div className="shadow-lg border border-gray-300 rounded-lg p-4 mt-4">
                <table className="text-xl font-bold table-auto w-full">
                    <thead className="shadow-md">
                        <tr className="bg-black text-white">
                            <th className="border border-gray-300 p-2 text-center">No</th>
                            <th className="border border-gray-300 p-2 text-center">Nombre Conductor</th>
                            <th className="border border-gray-300 p-2 text-center">Renta</th>
                            <th className="border border-gray-300 p-2 text-center">Saldo</th>
                            <th className="border border-gray-300 p-2 text-center">Cobro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCobros.length > 0 ? (
                            filteredCobros.map((cobro, index) => (
                                <tr key={cobro.id} className="shadow-md">
                                    <td className="border p-2 text-center">{index + 1}</td>
                                    <td className="border p-2 text-center">{getConductorNombre(cobro.idConductor)}</td>
                                    <td className="border p-2 text-right">${cobro.renta}</td>
                                    <td className="border p-2 text-right">${cobro.saldo}</td>
                                    <td className="border p-2 text-right">${cobro.cobro}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No se encontraron cobros para este rango de fechas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaCobros;
