import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosConfig.js";
import DateSelector from "./DateSelector";
import Swal from "sweetalert2";
import CompViewConductor from "../../CompConductores/action/viewConductor";

const TablaCobros = () => {
    const [cobros, setCobros] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [propietarios, setPropietarios] = useState([]);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalConductorData, setModalConductorData] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const URI_COBROS = "http://localhost:8000/cobros/";
    const URI_CONDUCTORES = "http://localhost:8000/conductores/";
    const URI_PROPIETARIOS = "http://localhost:8000/propietarios/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cobrosData = await axiosInstance.get(URI_COBROS);
                setCobros(cobrosData.data);
                console.log(cobrosData.data);

                const conductoresData = await axiosInstance.get(URI_CONDUCTORES);
                setConductores(conductoresData.data);

                const propietariosData = await axiosInstance.get(URI_PROPIETARIOS);
                setPropietarios(propietariosData.data);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudieron obtener los datos.",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Aceptar",
                });
            }
        };

        fetchData();
    }, []);

    const handleFechaChange = (inicio, fin) => {
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}`);
        };

        setFechaInicio(parseDate(inicio));
        setFechaFin(parseDate(fin));
    };

    const getFilteredCobros = () => {
        if (!fechaInicio || !fechaFin) return [];

        // Convert to date-only strings for comparison
        const start = fechaInicio.toISOString().split("T")[0];
        const end = fechaFin.toISOString().split("T")[0];

        return cobros.filter((cobro) => {
            const cobroFechaInicio = new Date(cobro.fechaInicio).toISOString().split("T")[0];
            const cobroFechaFin = new Date(cobro.fechaFin).toISOString().split("T")[0];

            const fechaValida = cobroFechaInicio >= start && cobroFechaFin <= end;

            const conductorValido =
                searchTerm === "" ||
                conductores
                    .find((conductor) => conductor.id === cobro.idConductor)
                    ?.nombre.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            return fechaValida && conductorValido;
        });
    };

    const filteredCobros = getFilteredCobros();

    const getConductorNombre = (id) => {
        const conductor = conductores.find((conductor) => conductor.id === id);
        return conductor ? conductor.nombre : "Desconocido";
    };

    const getPropietarioNombre = (idPropietario) => {
        const propietario = propietarios.find((propietario) => propietario.id === idPropietario);
        return propietario ? propietario.nombre : "Propietario no encontrado";
    };

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

    const handleSwitchChange = async (id, pagoValue) => {
        try {
            const response = await axiosInstance.put(`${URI_COBROS}${id}`, { pago: pagoValue });
            if (response.status === 200) {
                setCobros((prevCobros) =>
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

    const updateCobroo = async (id, renta, saldo) => {
        try {
            const nuevoCobro = renta - saldo;
            const response = await axiosInstance.put(`${URI_COBROS}${id}`, { cobro: nuevoCobro });

            if (response.status === 200) {
                setCobros((prevCobros) =>
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
    };

    const handleEdit = async (id, field, value) => {
        try {
            const response = await axiosInstance.put(`${URI_COBROS}${id}`, { [field]: value });

            if (response.status === 200) {
                setCobros((prevCobros) =>
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

    const showModalConductor = (conductorId) => {
        setModalConductorData(conductorId);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalConductorData(null);
    };

    const groupedCobros = groupByPropietario();

    return (
        <div className="mt-2">
            <DateSelector onFechaChange={handleFechaChange} onSearchChange={setSearchTerm} />
            {modalIsOpen && <CompViewConductor id={modalConductorData} onClose={closeModal} />}

            {Object.keys(groupedCobros).map((propietarioId) => {
                const totals = calculateTotals(groupedCobros[propietarioId]);

                return (
                    <div key={propietarioId} className="mb-6">
                        <div className="shadow-lg border border-gray-300 rounded-lg p-4">
                            <div className="flex">
                                <i className="fa-solid fa-user-tie text-4xl mr-4"></i>
                                <p className="font-bold mt-2 text-2xl">{getPropietarioNombre(parseInt(propietarioId))}</p>
                            </div>
                            <table className="font-bold w-full overflow-visible">
                                <thead className="text-xl sticky top-16 bg-black text-white z-10">
                                    <tr className="bg-black text-white">
                                        <th className="border border-gray-300 p-2 text-center w-8">No</th>
                                        <th className="border border-gray-300 cursor-pointer p-2 text-center w-96">Nombre Conductor</th>
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
                                        <tr key={cobro.id} className="bg-gray-100 hover:bg-gray-200">
                                            <td className="border p-2 text-center">{index + 1}</td>
                                            <td
                                                className="cursor-pointer border p-2 text-center"
                                                onClick={() => showModalConductor(cobro.idConductor)}
                                            >
                                                {getConductorNombre(cobro.idConductor)}
                                            </td>
                                            <td className="border p-2 text-center">
                                            <div className="flex justify-center">
                                            <a className="mr-1">$</a>
                                                <input
                                                    type="number"
                                                    value={cobro.renta}
                                                    onChange={(e) => {
                                                        const newRenta = parseFloat(e.target.value);
                                                        handleEdit(cobro.id, 'renta', newRenta);
                                                        updateCobroo(cobro.id, newRenta, cobro.saldo);
                                                    }}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                />
                                                </div>
                                            </td>
                                            <td className="border p-2 text-center">
                                            <div className="flex justify-center">
                                            <a className="mr-1">$</a>
                                                <input
                                                    type="number"
                                                    value={cobro.saldo}
                                                    onChange={(e) => {
                                                        const newSaldo = parseFloat(e.target.value);
                                                        handleEdit(cobro.id, 'saldo', newSaldo);
                                                        updateCobroo(cobro.id, cobro.renta, newSaldo);
                                                    }}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                />
                                                </div>
                                            </td>
                                            <td className="border p-2 text-center">
                                            <div className="flex justify-center">
                                            <a className="mr-1">$</a>
                                                <input
                                                    type="number"
                                                    value={(cobro.renta - cobro.saldo).toFixed(2)}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                    readOnly
                                                />
                                                </div>
                                            </td>
                                            <td className="border p-2 text-center">
                                            <div className="flex justify-center">
                                            <a className="mr-1">$</a>
                                                <input
                                                    type="number"
                                                    value={cobro.deuda}
                                                    onChange={(e) => handleEdit(cobro.id, 'deuda', parseFloat(e.target.value))}
                                                    className="w-full text-center border-gray-300 rounded-md shadow-sm"
                                                />
                                                </div>
                                            </td>
                                            <td className="border p-2 text-center">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={cobro.pago === 1}
                                                        onChange={() => handleSwitchChange(cobro.id, cobro.pago === 1 ? 0 : 1)}
                                                    />
                                                    <div className={`z-0 w-11 h-6 rounded-full relative transition-all duration-300 ${cobro.pago === 1 ? 'bg-green-600' : 'bg-gray-600'}`}>
                                                        <div className={`absolute left-1 top-1 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 ease-in-out transform ${cobro.pago === 1 ? 'translate-x-5' : ''}`}></div>
                                                    </div>
                                                </label>
                                            </td>
                                            <td className="border p-2 text-center">
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

                            <div className="flex space-x-4 mt-4 justify-center text-xl">
                                <div className="text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Rentas: ${totals.renta.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Saldos: ${totals.saldo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
                                    Cobros: ${totals.cobro.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-white bg-blue-900 font-bold px-4 py-2 rounded-md">
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
