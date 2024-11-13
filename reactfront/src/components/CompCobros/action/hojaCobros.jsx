import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';
import Encabezado from "../others/Encabezado";
import DateSelector from "./DateSelector";
import CompViewVehiculo from "../../CompVehiculos/actions/viewVehiculo"; // Asegúrate de importar el componente

const HojaCobros = ({ isCollapsed, vehiculos, contratos, propietarios, conductores, setShowHojaCobros }) => {
    const [propietariosConConductores, setPropietariosConConductores] = useState([]);
    const [selectedVehiculoId, setSelectedVehiculoId] = useState(null); // Estado para el vehículo seleccionado
    const [showVehiculo, setShowVehiculo] = useState(false); // Estado para mostrar el componente de vehículo
    const [idConductor, setIdConductor] = useState("");
    const [idVehiculo, setIdVehiculo] = useState("");
    const [idPropietario, setIdPropietario] = useState("");
    const [renta, setRenta] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [cobro, setCobro] = useState(0); // Esta es la variable que almacenará el cobro
    const [deuda, setDeuda] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [nota, setNota] = useState("");
    const [activo, setActivo] = useState(1);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const URI = 'http://localhost:8000/cobros';

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
                    const total = (renta - saldo) || 0;
                    const vehiculo = contrato.idVehiculo || "No asignado";
                    setCobro(total);
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

    // Función que maneja el cambio de fechas
    const handleFechaChange = (inicio, fin) => {
        // Convertir la fecha 'inicio' y 'fin' de formato 'DD/MM/YYYY' a 'YYYY-MM-DD'
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        };

        const Finicio = parseDate(inicio).toISOString(); // Formatear la fecha de inicio
        const Ffin = parseDate(fin).toISOString(); // Formatear la fecha de fin

        setFechaInicio(Finicio);
        setFechaFin(Ffin);

        console.log("Fecha Inicio: ", Finicio, "Fecha Fin: ", Ffin);
    };

    // Función que maneja el cambio del término de búsqueda
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    // Función que maneja el cambio de renta
    const handlerentaChange = (e) => {
        const value = e.target.value;
        setRenta(value);

        setPropietariosConConductores(prevState => {
            return prevState.map(propietario => {
                return {
                    ...propietario,
                    conductores: propietario.conductores.map(conductor => {
                        if (conductor.id === e.target.name) {
                            const updatedCobro = value - conductor.saldo; // Recalcular cobro cuando renta cambia
                            return {
                                ...conductor,
                                renta: value,
                                total: updatedCobro,
                                cobro: updatedCobro,  // Actualizamos cobro aquí
                            };
                        }
                        return conductor;
                    }),
                };
            });
        });
    };

    // Función que maneja el cambio de saldo
    const handlesaldoChange = (e) => {
        const value = e.target.value;
        setSaldo(value);

        setPropietariosConConductores(prevState => {
            return prevState.map(propietario => {
                return {
                    ...propietario,
                    conductores: propietario.conductores.map(conductor => {
                        if (conductor.id === e.target.name) {
                            const updatedCobro = conductor.renta - value; // Recalcular cobro cuando saldo cambia
                            return {
                                ...conductor,
                                saldo: value,
                                total: updatedCobro,
                                cobro: updatedCobro,  // Actualizamos cobro aquí
                            };
                        }
                        return conductor;
                    }),
                };
            });
        });
    };

    // Función que maneja el cambio de cobro
    const handlecobroChange = (e) => {
        setCobro(e.target.value); // Actualiza el valor de cobro directamente desde la entrada
    };

    // Función que maneja el cambio de nota
    const handlenotaChange = (e) => {
        setNota(e.target.value);
    };

    // Función para manejar la entrada en los campos como renta, saldo, nota, etc.
    const handleInputChange = (e, conductorId, field) => {
        const value = e.target.value;
    
        setPropietariosConConductores(prevState => {
            return prevState.map(propietario => {
                return {
                    ...propietario,
                    conductores: propietario.conductores.map(conductor => {
                        if (conductor.id === conductorId) {
                            let updatedCobro = conductor.cobro;  // Dejar el valor de cobro existente como base

                            if (field === "renta") {
                                updatedCobro = value - conductor.saldo;  // Actualizar cobro basado en renta
                                return {
                                    ...conductor,
                                    renta: value,
                                    total: updatedCobro,
                                    cobro: updatedCobro,  // Actualizamos el cobro aquí
                                };
                            } else if (field === "saldo") {
                                updatedCobro = conductor.renta - value;  // Actualizar cobro basado en saldo
                                return {
                                    ...conductor,
                                    saldo: value,
                                    total: updatedCobro,
                                    cobro: updatedCobro,  // Actualizamos el cobro aquí
                                };
                            } else if (field === "nota") {
                                return {
                                    ...conductor,
                                    nota: value,
                                };
                            }
                        }
                        return conductor;
                    }),
                };
            });
        });
    };
    
// Función para guardar los datos uno por uno
const handleSave = async () => {
    try {
        // Recorre todos los propietarios y sus conductores
        for (const propietario of propietariosConConductores) {
            for (const conductor of propietario.conductores) {
                const cobroData = {
                    idConductor: parseInt(conductor.id),  // Convertir a entero
                    idVehiculo: parseInt(conductor.idVehiculo),  // Convertir a entero
                    idPropietario: parseInt(propietario.id),  // Convertir a entero
                    renta: conductor.renta ? parseFloat(conductor.renta) : 0,  // Verificar si es vacío
                    saldo: conductor.saldo ? parseFloat(conductor.saldo) : 0,  // Verificar si es vacío
                    cobro: conductor.cobro ? parseFloat(conductor.cobro) : conductor.renta,  // Verificar si es vacío
                    fechaInicio,
                    fechaFin,
                    nota: conductor.nota,
                    activo: parseInt(activo),
                };

                // Mostrar datos para depuración
                console.log("Datos de cobro del conductor: ", cobroData);

                /* Verificar que todos los campos estén bien antes de enviar
                if (!cobroData.renta || !cobroData.saldo || !cobroData.cobro) {
                    console.log("Faltan datos en el cobroData para el conductor: ", conductor.id);
                    continue; // Saltar a la siguiente iteración si hay datos faltantes
                }
*/
                try {
                    // Enviar el cobro uno por uno
                    const response = await axios.post(URI, cobroData);
                    console.log("Respuesta de la API: ", response);

                    if (response.status === 201) {
                        // Si la respuesta es exitosa, continuar con el siguiente conductor
                        console.log(`Cobro guardado exitosamente para el conductor: ${conductor.id}`);
                    } else {
                        // Si la respuesta no es 201, lanzar un error
                        throw new Error(`Error al guardar el cobro para el conductor: ${conductor.id}`);
                    }
                } catch (error) {
                    // Log del error específico del conductor
                    console.error(`Error al guardar el cobro para el conductor ${conductor.id}:`, error.message);
                    throw error;  // Detener el proceso y salir del ciclo
                }
            }
        }

        Swal.fire({
            title: "¡Guardado!",
            text: "Los cobros se han guardado correctamente",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
    } catch (error) {
        Swal.fire({
            title: "¡Error!",
            text: "Ha ocurrido un error al guardar los cobros. Verifica los datos.",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
        });
    }
};



    // Función para cerrar el modal
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

    const handleVehiculoClick = (vehiculoId) => {
        setSelectedVehiculoId(vehiculoId); // Establece el ID del vehículo
        setShowVehiculo(true); // Muestra el componente
    };

    const handleCloseVehiculo = () => {
        setShowVehiculo(false); // Cierra el componente
    };

    return (
        <>
            <Encabezado />
            <div
                id="fechas"
                className={`pt-24 mr-12 mb-12 transition-all duration-300 ${isCollapsed ? "ml-28" : "ml-28"}`}
            >
                <button className="absolute right-2 -my-5 text-red-500 hover:text-red-800 text-3xl " onClick={closeModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <h1
                className="text-4xl text-center font-bold mb-2 no-select"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
                    <i className="fa-solid fa-file-contract mr-4"></i>
                    Crear Nueva Hoja de Cobros
                    </h1>
                    <hr className="mb-4 border-gray-800 border-t-8"></hr>
                {/* Selector de fechas */}
                <div className="shadow-lg border border-gray-300 rounded-lg p-4">
                <DateSelector onFechaChange={handleFechaChange} onSearchChange={handleSearchChange} />

                {filteredPropietarios.map((propietario) => (
                    <div key={propietario.id} className="mb-8">
                        <div className="flex">
                            <i className="fa-solid fa-user-tie text-4xl mr-4"></i>
                            <p className="font-bold mt-2 text-2xl">{propietario.nombre}</p>
                        </div>
                        {propietario.conductores.length > 0 ? (
                            <table className="text-xl font-bold table-auto w-full">
                                <thead className="shadow-md">
                                    <tr className="bg-black text-white">
                                        <th className="border border-gray-300 p-2 text-center ">No</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/4">Nombre</th>
                                        <th className="border border-gray-300 p-2 text-center w-1/12">Renta</th>
                                        <th className="border border-gray-300 p-2 text-center w-36">Saldo</th>
                                        <th className="border border-gray-300 p-2 text-center w-36">Total</th>
                                        <th className="border border-gray-300 p-2 text-center">Nota</th>
                                        <th className="border border-gray-300 p-2 text-center w-36">Vehículo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {propietario.conductores.map((conductor) => (
                                        <tr key={conductor.id} className="shadow-md">
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
                                                    className="w-full text-black text-lg border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </td>
                                            <td className="border bg-gray-100 border-gray-300 p-2">
                                                <div className="flex items-center justify-center cursor-pointer text-sm">
                                                    {conductor.idVehiculo ? (
                                                        <button
                                                            onClick={() => handleVehiculoClick(conductor.idVehiculo)}
                                                            className="shadow bg-blue-500 py-2 pr-1 text-white rounded hover:bg-blue-600 font-bold"
                                                        >
                                                            <i className="fa-solid fa-eye ml-1"></i> Vehículo
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="shadow bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 font-bold"
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

                {/* Botón de Guardar */}
                <div className="flex justify-center mt-4">
                <div className="mr-4">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>
                </div>

                {/* Botón para Cancelar */}
                <div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                </div>
                </div>
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
