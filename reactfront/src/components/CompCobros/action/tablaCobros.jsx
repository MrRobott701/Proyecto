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
                filterCobros(fechaInicio, fechaFin, response.data, searchTerm); // Filtra cobros inmediatamente
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

    const getPropietarioNombre = (idPropietario) => {
        const propietario = propietarios.find((propietario) => propietario.id === idPropietario);
        return propietario ? propietario.nombre : "Propietario no encontrado"; // Si no se encuentra el propietario
    };

    // Función para agrupar los cobros por idPropietario
    const groupByPropietario = () => {
        const grouped = filteredCobros.reduce((acc, cobro) => {
            const propietarioId = cobro.idPropietario;
            if (!acc[propietarioId]) {
                acc[propietarioId] = [];
            }
            acc[propietarioId].push(cobro);
            return acc;
        }, {});

        return grouped;
    };

    // Función para manejar la actualización del estado de pago (switch)
    const handleSwitchChange = async (id, pagoValue) => {
        try {
            // Realizamos la actualización en la base de datos
            const response = await axios.put(`${URI_COBROS}${id}`, { pago: pagoValue });
            if (response.status === 200) {
                // Actualizamos el estado local con el nuevo valor de 'pago'
                setFilteredCobros((prevCobros) =>
                    prevCobros.map((cobro) =>
                        cobro.id === id ? { ...cobro, pago: pagoValue } : cobro
                    )
                );
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el estado de pago.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
        }
    };

    // Actualiza el valor de cobro cuando cambia renta o saldo
    const updateCobroo = async (id, renta, saldo) => {
        try {
            // Calculamos el nuevo valor de cobro
            const nuevoCobro = renta - saldo;

            // Realizamos la actualización en la base de datos
            const response = await axios.put(`${URI_COBROS}${id}`, { cobro: nuevoCobro });

            if (response.status === 200) {
                // Actualizamos el estado local con el nuevo valor de cobro
                setFilteredCobros((prevCobros) =>
                    prevCobros.map((cobro) =>
                        cobro.id === id ? { ...cobro, cobro: nuevoCobro } : cobro
                    )
                );
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el cobro.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
        }

        return renta - saldo;
    };

    // Función para manejar la edición de los valores (Renta, Saldo, Cobro, Deuda y Nota)
    const handleEdit = async (id, field, value) => {
        try {
            // Actualizamos el valor del campo en la base de datos
            const response = await axios.put(`${URI_COBROS}${id}`, { [field]: value });

            if (response.status === 200) {
                // Actualizamos el estado local con el nuevo valor del campo
                setFilteredCobros((prevCobros) =>
                    prevCobros.map((cobro) =>
                        cobro.id === id ? { ...cobro, [field]: value } : cobro
                    )
                );
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `No se pudo actualizar ${field}.`,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
            });
        }
    };

    // Calcular el total de cada columna
    const calculateTotals = (cobros) => {
        const totals = cobros.reduce(
            (acc, cobro) => {
                acc.renta += cobro.renta || 0;
                acc.saldo += cobro.saldo || 0;
                acc.cobro += cobro.cobro || 0;
                acc.deuda += cobro.deuda || 0;
                return acc;
            },
            { renta: 0, saldo: 0, cobro: 0, deuda: 0 }
        );
        return totals;
    };

    const groupedCobros = groupByPropietario();

    return (
        <div className="mt-2">
            {/* Componente DateSelector para seleccionar el rango de fechas */}
            <DateSelector onFechaChange={handleFechaChange} onSearchChange={setSearchTerm} /> {/* Pasando setSearchTerm como prop */}

            {Object.keys(groupedCobros).map((propietarioId) => {
                const totals = calculateTotals(groupedCobros[propietarioId]);

                return (
                    <div key={propietarioId} className="mb-6">
                        <div className="shadow-lg border border-gray-300 rounded-lg p-4">
                            <div className="flex">
                                <i className="fa-solid fa-user-tie text-4xl mr-4"></i>
                                <p className="font-bold mt-2 text-2xl">{getPropietarioNombre(parseInt(propietarioId))}</p>
                            </div>

                            <table className="text-xl font-bold table-auto w-full">
                                <thead className="shadow-md">
                                    <tr className="bg-black text-white">
                                        <th className="border border-gray-300 p-2 text-center w-8">No</th>
                                        <th className="border border-gray-300 p-2 text-center w-96">Nombre Conductor</th>
                                        <th className="border border-gray-300 p-2 text-center w-32">Renta</th>
                                        <th className="border border-gray-300 p-2 text-center w-32">Saldo</th>
                                        <th className="border border-gray-300 p-2 text-center w-32">Cobro</th>
                                        <th className="border border-gray-300 p-2 text-center w-32">Deuda</th>
                                        <th className="border border-gray-300 p-2 text-center w-16">Pago</th>
                                        <th className="border border-gray-300 p-2 text-center ">Nota</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg">
                                    {groupedCobros[propietarioId].map((cobro, index) => (
                                        <tr key={cobro.id} className="shadow-md">
                                            <td className="border bg-gray-100 p-2 text-center">{index + 1}</td>
                                            <td className="border bg-gray-100 p-2 text-center">{getConductorNombre(cobro.idConductor)}</td>
                                            <td className="border bg-gray-100 p-2 text-center">
                                            <div className="flex items-center justify-end">                                            
<span className="mr-1">$</span>
    <input
        type="number"
        value={cobro.renta}
        onChange={(e) => {
            const newRenta = parseFloat(e.target.value);
            handleEdit(cobro.id, 'renta', newRenta); // Actualizar renta en el estado
            updateCobroo(cobro.id, newRenta, cobro.saldo); // Actualizar cobro en la base de datos
        }}
        className="w-full text-center border-gray-300 rounded-md shadow-sm"
    />
</div>
</td>
<td className="border bg-gray-100 p-2 text-center">
<div className="flex items-center justify-end">                                            
<span className="mr-1">$</span>
    <input
        type="number"
        value={cobro.saldo}
        onChange={(e) => {
            const newSaldo = parseFloat(e.target.value);
            handleEdit(cobro.id, 'saldo', newSaldo); // Actualizar saldo en el estado
            updateCobroo(cobro.id, cobro.renta, newSaldo); // Actualizar cobro en la base de datos
        }}
        className="w-full text-center border-gray-300 rounded-md shadow-sm"
    />
</div>
</td>

<td className="border bg-gray-100 p-2 text-center">
<div className="flex items-center justify-end">                                            
<span className="mr-1">$</span>
    {/* Mostrar el valor calculado de cobro */}
    <input 
    type="number" 
    value={(cobro.renta - cobro.saldo).toFixed(2)}
    className="w-full text-center border-gray-300 rounded-md shadow-sm"
    ></input>
    </div>
</td>

                                            <td className="border bg-gray-100 p-2 text-center">
                                            <div className="flex items-center justify-end">                                            
                                            <span className="mr-1">$</span>
                                                <input
                                                    type="number"
                                                    value={cobro.deuda}
                                                    onChange={(e) => handleEdit(cobro.id, 'deuda', parseFloat(e.target.value))}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                />
                                            </div>
                                            </td>
                                            <td className="border bg-gray-100 p-2 text-center">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={cobro.pago === 1}
                                                        onChange={() => handleSwitchChange(cobro.id, cobro.pago === 1 ? 0 : 1)}
                                                    />
                                                    <div
                                                        className={`w-11 h-6 rounded-full relative transition-all duration-300 ${cobro.pago === 1 ? 'bg-green-600' : 'bg-gray-600'}`}
                                                    >
                                                        <div
                                                            className={`absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out transform ${cobro.pago === 1 ? 'translate-x-5' : ''}`}
                                                        ></div>
                                                    </div>
                                                </label>
                                            </td>
                                            <td className="border bg-gray-100 p-2 text-center">
                                                <input
                                                    type="text"
                                                    value={cobro.nota}
                                                    onChange={(e) => handleEdit(cobro.id, 'nota', e.target.value)}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Fila con los totales */}
                            <div className="flex space-x-4 mt-4 justify-center text-xl">
                                <div className=" text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Rentas: ${totals.renta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className=" text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Saldos: ${totals.saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className=" text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Cobros: ${totals.cobro.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className=" text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Deudas: ${totals.deuda.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TablaCobros;
