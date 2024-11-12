import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Encabezado from "../others/Encabezado";
import DateSelector from "./DateSelector";
import CompViewVehiculo from "../../CompVehiculos/actions/viewVehiculo"; // Asegúrate de importar el componente

const HojaCobros = ({ isCollapsed, vehiculos, contratos, propietarios, conductores, setShowHojaCobros }) => {
    const [propietariosConConductores, setPropietariosConConductores] = useState([]);
    const [selectedVehiculoId, setSelectedVehiculoId] = useState(null); // Estado para el1 vehículo seleccionado
    const [showVehiculo, setShowVehiculo] = useState(false); // Estado para mostrar el componente de vehículo
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const URI_COBROS = "http://localhost:8000/cobros";
    useEffect(() => {
        const mapPropietariosConConductores = () => {
            const mappedData = propietarios.map((propietario) => {
                const contratosDelPropietario = contratos.filter(
                    (contrato) => contrato.idPropietario === propietario.id
                );

                const conductoresAsignados = contratosDelPropietario.map((contrato, index) => {
                    const conductor = conductores.find(
                        (conductor) => conductor.id === contrato.idConductor
                    );

                    if (!conductor) return null;

                    const renta = contrato.precioRenta || 0;
                    const saldo = ""; // Pendiente de implementar
                    const total = (renta + saldo) || 0;
                    const vehiculo = contrato.idVehiculo || "No asignado";

                    return {
                        ...conductor,
                        idContrato: contrato.id,
                        idPropietario: propietario.id,
                        renta,
                        saldo,
                        total,
                        nota: "",
                        vehiculo,
                        index: index + 1,
                    };
                }).filter(Boolean);

                return {
                    ...propietario,
                    conductores: conductoresAsignados,
                };
            });

            setPropietariosConConductores(mappedData);
        };

        mapPropietariosConConductores();
    }, [propietarios, contratos, conductores]);

    // Manejo de los cambios en renta, saldo y nota
    const handleInputChange = (e, conductorId, field) => {
        setPropietariosConConductores(prevState => {
            return prevState.map(propietario => {
                return {
                    ...propietario,
                    conductores: propietario.conductores.map(conductor => {
                        if (conductor.id === conductorId) {
                            const updatedValue = e.target.value;

                            if (field === "renta" || field === "saldo") {
                                let updatedRenta = conductor.renta;
                                let updatedSaldo = conductor.saldo;

                                if (field === "renta") {
                                    updatedRenta = parseFloat(updatedValue) || "";
                                } else if (field === "saldo") {
                                    updatedSaldo = parseFloat(updatedValue) || "";
                                }

                                const updatedTotal = updatedRenta + updatedSaldo;

                                return {
                                    ...conductor,
                                    renta: updatedRenta,
                                    saldo: updatedSaldo,
                                    total: updatedTotal,
                                };
                            }

                            if (field === "nota") {
                                return {
                                    ...conductor,
                                    nota: updatedValue,
                                };
                            }

                            return conductor;
                        }
                        return conductor;
                    }),
                };
            });
        });
    };

    const handleVehiculoClick = (vehiculoId) => {
        setSelectedVehiculoId(vehiculoId); // Establece el ID del vehículo
        setShowVehiculo(true); // Muestra el componente
    };

    const handleCloseVehiculo = () => {
        setShowVehiculo(false); // Cierra el componente
    };

    const handleFechaChange = (inicio, fin) => {
        setFechaInicio(inicio);
        setFechaFin(fin);
        console.log("Fecha Inicio: ", inicio, "Fecha Fin: ", fin);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const closeModal = () => {
        Swal.fire({
            title: "¿Seguro que deseas salir?",
            text: "Los cambios no se guardarán",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33", // Botón "No" en rojo
            confirmButtonColor: "#24ab0c", // Botón "Sí" en azul
            cancelButtonText: "No",
            confirmButtonText: "Sí, Salir",
            customClass: {
                cancelButton: 'swal2-cancel swal2-styled swal2-cancel-custom', // Estilo personalizado para el botón "No"
                confirmButton: 'swal2-confirm swal2-styled swal2-confirm-custom', // Estilo personalizado para el botón "Sí"
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setShowHojaCobros(false);
            }
        });
    };
    
    

    // Filtrar conductores según el término de búsqueda
    const filteredPropietarios = propietariosConConductores.map((propietario) => {
        const filteredConductores = propietario.conductores.filter(conductor =>
            conductor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro por nombre
        );

        return {
            ...propietario,
            conductores: filteredConductores,
        };
    });

    return (
        <>
            <Encabezado />
            <div
                id="fechas"
                className={`pt-24 mr-12 mb-12 transition-all duration-300 ${isCollapsed ? "ml-28" : "ml-28"}`}
            >
                <button className="absolute right-2 -my-5 text-red-500 hover:text-red-800 text-3xl "
                onClick={closeModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                <h1 className="text-2xl font-bold text-center mb-2">Crear Nueva Hoja de Cobros</h1>
                <DateSelector onFechaChange={handleFechaChange} onSearchChange={handleSearchChange} />
                
                {filteredPropietarios.map((propietario) => (
                    <div key={propietario.id} className="mb-8">
                        <div className="flex">
                            <i className="fa-solid fa-user-tie text-4xl mr-4"></i>
                            <p className="font-bold mt-3 text-xl">{propietario.nombre}</p>
                        </div>
                        {propietario.conductores.length > 0 ? (
                            <table className="font-bold table-auto w-full border-collapse border border-gray-300">
                                <thead className="rounded-lg shadow-md">
                                    <tr className="bg-black text-white">
                                        <th className="border border-gray-300 p-2 text-center">No#</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/3">Nombre</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/12">Renta</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/12">Saldo</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/12">Total</th>
                                        <th className="border border-gray-300 p-2 text-center">Nota</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/6">Vehículo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {propietario.conductores.map((conductor) => (
                                        <tr key={conductor.id} className="rounded-lg shadow-md">
                                            <td className="border bg-gray-100 border-red-500 p-2 text-center">{conductor.index}</td>
                                            <td className="border bg-gray-100 border-gray-300 p-2 text-center">{conductor.nombre}</td>
                                            <td className="border bg-gray-100 border-gray-300 p-2 text-right">
                                                <div className="flex items-center justify-end">
                                                    <span className="mr-1">$</span>
                                                    <input
                                                        type="number"
                                                        value={conductor.renta}
                                                        dir="ltr"  // Esto asegura que el texto se escriba de izquierda a derecha
                                                        className="w-full text-right border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => handleInputChange(e, conductor.id, "renta")}
                                                    />
                                                </div>
                                            </td>
                                            <td className="border bg-gray-100 border-gray-300 p-2 text-right">
                                                <div className="flex items-center justify-end">
                                                    <span className="mr-1">$</span>
                                                    <input
                                                        type="number"
                                                        value={conductor.saldo}
                                                        dir="ltr"  // Esto asegura que el texto se escriba de izquierda a derecha
                                                        className="w-full text-right border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => handleInputChange(e, conductor.id, "saldo")}
                                                    />
                                                </div>
                                            </td>
                                            <td className="border bg-gray-100 border-gray-300 p-2 text-right">
                                                <div className="flex items-center justify-end">
                                                    <span className="mr-1">$</span>
                                                    <input
                                                        type="number"
                                                        value={conductor.total}
                                                        dir="ltr"  // Esto asegura que el texto se escriba de izquierda a derecha
                                                        className="w-full text-right bg-white rounded-md shadow-sm"
                                                        readOnly
                                                        disabled  // Esto deshabilita el campo para evitar la selección y edición
                                                    />
                                                </div>
                                            </td>
                                            <td className="border bg-gray-100 border-gray-300 p-2">
                                                <input
                                                    type="text"
                                                    value={conductor.nota}
                                                    onChange={(e) => handleInputChange(e, conductor.id, "nota")}
                                                    className="w-full text-gray-700 border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="border bg-gray-100 border-gray-300 p-2">
                                                <div className="flex items-center justify-center cursor-pointer">
                                                    {conductor.idVehiculo ? (
                                                        <button
                                                            onClick={() => handleVehiculoClick(conductor.idVehiculo)}
                                                            className="shadow bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 font-bold"
                                                        >
                                                            <i className="fa-solid fa-eye"></i> Ver Vehículo
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="shadow bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 font-bold"
                                                            onClick={() => {
                                                                // Si idVehiculo no es válido, asigna 0
                                                                if (!conductor.idVehiculo) {
                                                                    conductor.idVehiculo = 0;
                                                                }
                                                            }}
                                                        >
                                                            Sin Vehículo
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No se encontró conductor</p>
                        )}
                    </div>
                    
                ))}
                {/* Boton para Cancelar */}
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                    </div>
            </div>

            {/* Mostrar el componente CompViewVehiculo cuando se selecciona un vehículo */}
            {showVehiculo && (
                <CompViewVehiculo id={selectedVehiculoId} onClose={handleCloseVehiculo} />
            )}
        </>
    );
};

export default HojaCobros;
