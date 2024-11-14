import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import Encabezado from "../others/Encabezado";
import { startOfMonth, endOfMonth, startOfWeek, format } from 'date-fns';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const MetricaCobros = ({ isCollapsed, cobros, propietarios, conductores, setShowMetricasCobros }) => {
    // Estados para los filtros y la gráfica
    const [filteredCobros, setFilteredCobros] = useState(cobros);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedVariables, setSelectedVariables] = useState(['cobro']); // Variables seleccionadas para mostrar en el gráfico
    const [idPropietario, setIdPropietario] = useState('');
    const [idConductor, setIdConductor] = useState('');

    // Establecer las fechas de inicio y fin del mes actual
    useEffect(() => {
        const now = new Date();
        const start = startOfMonth(now); // Primer día del mes
        const end = endOfMonth(now); // Último día del mes

        setStartDate(format(start, 'yyyy-MM-dd')); // Convierte la fecha a formato adecuado
        setEndDate(format(end, 'yyyy-MM-dd')); // Convierte la fecha a formato adecuado
    }, []);

    // Agrupar cobros por semana
    const groupCobrosByWeek = (cobros) => {
        const grouped = {};

        cobros.forEach(cobro => {
            // Obtener el inicio de la semana (lunes)
            const startOfWeekDate = startOfWeek(new Date(cobro.fechaInicio), { weekStartsOn: 1 }); // 1 para lunes
            const weekKey = format(startOfWeekDate, 'yyyy-MM-dd');

            // Agrupar los cobros por semana
            if (!grouped[weekKey]) {
                grouped[weekKey] = {
                    cobro: 0,
                    saldo: 0,
                    renta: 0,
                    deuda: 0,
                    count: 0
                };
            }

            // Sumar los valores de la semana
            grouped[weekKey].cobro += cobro.cobro || 0;
            grouped[weekKey].saldo += cobro.saldo || 0;
            grouped[weekKey].renta += cobro.renta || 0;
            grouped[weekKey].deuda += cobro.deuda || 0;
            grouped[weekKey].count += 1;
        });

        return grouped;
    };

    // Filtrar y agrupar por semana
    useEffect(() => {
        let filtered = cobros;

        // Filtrar por fechas
        if (startDate) {
            filtered = filtered.filter(cobro => new Date(cobro.fechaInicio) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(cobro => new Date(cobro.fechaFin) <= new Date(endDate));
        }

        // Filtrar por idPropietario y idConductor
        if (idPropietario) {
            filtered = filtered.filter(cobro => cobro.idPropietario === parseInt(idPropietario));
        }
        if (idConductor) {
            filtered = filtered.filter(cobro => cobro.idConductor === parseInt(idConductor));
        }

        // Agrupar los cobros por semana
        const groupedByWeek = groupCobrosByWeek(filtered);
        const weekLabels = Object.keys(groupedByWeek);
        const datasets = [];

        // Preparar los datasets basados en las variables seleccionadas
        if (selectedVariables.includes('cobro')) {
            datasets.push({
                label: "Cobros",
                data: weekLabels.map(week => groupedByWeek[week].cobro),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            });
        }
        if (selectedVariables.includes('saldo')) {
            datasets.push({
                label: "Saldo",
                data: weekLabels.map(week => groupedByWeek[week].saldo),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            });
        }
        if (selectedVariables.includes('renta')) {
            datasets.push({
                label: "Renta",
                data: weekLabels.map(week => groupedByWeek[week].renta),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                fill: true,
            });
        }
        if (selectedVariables.includes('deuda')) {
            datasets.push({
                label: "Deuda",
                data: weekLabels.map(week => groupedByWeek[week].deuda),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            });
        }

        setFilteredCobros(groupedByWeek);
        setWeekData({
            labels: weekLabels,
            datasets: datasets,
        });

    }, [startDate, endDate, selectedVariables, idPropietario, idConductor, cobros]);

    // Datos para la gráfica
    const [weekData, setWeekData] = useState({
        labels: [],
        datasets: [],
    });

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fecha',
                    font: {
                        size: 28,  // Tamaño de la letra
                        weight: 'bold',  // Negrita
                        family: 'Arial, sans-serif',  // Tipo de fuente
                    },
                },
                ticks: {
                    font: {
                        size: 18,  // Tamaño de los números en el eje X
                        weight: 'bold',  // Números en negrita
                        family: 'Arial, sans-serif',  // Tipo de fuente de los números
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Monto ($)',
                    font: {
                        size: 28,  // Tamaño de la letra
                        weight: 'bold',  // Negrita
                        family: 'Arial, sans-serif',  // Tipo de fuente
                    },
                },
                ticks: {
                    font: {
                        size: 18,  // Tamaño de los números en el eje X
                        weight: 'bold',  // Números en negrita
                        family: 'Arial, sans-serif',  // Tipo de fuente de los números
                    },
                    callback: function(value) {
                        return '$' + value.toFixed(2);  // Aquí agregamos el signo "$" y formateamos el número
                    }
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 18,  // Tamaño de la letra en la leyenda
                        weight: 'bold',  // Negrita en la leyenda
                        family: 'Arial, sans-serif',  // Tipo de fuente en la leyenda
                    },
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                titleFont: {
                    size: 18,  // Tamaño de la letra en el tooltip
                    weight: 'bold',  // Negrita en el título del tooltip
                    family: 'Arial, sans-serif',  // Tipo de fuente del título del tooltip
                },
                bodyFont: {
                    size: 14,  // Tamaño del cuerpo del tooltip
                    family: 'Arial, sans-serif',  // Tipo de fuente en el cuerpo del tooltip
                },
            },
        },
    };
    

    // Handlers para las fechas
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    // Handler para seleccionar variables
    const handleVariableChange = (e) => {
        const value = e.target.value;
        setSelectedVariables(prevState =>
            prevState.includes(value)
                ? prevState.filter(v => v !== value)
                : [...prevState, value]
        );
    };

    return (
        <>
            <Encabezado />
            <div className={`pt-20 mr-12 mb-12 transition-all duration-300 ${isCollapsed ? "ml-28" : "ml-28"}`}>
            <div className="font-bold text-center text-3xl mb-2">
            <p>Métricas de Cobros por Semana</p>
            <div className="flex justify-end">    
                <button 
            className="absolute right-4 py-20 text-red-500 hover:text-red-800 text-4xl "
            style = {{ transform: 'translateY(-60%)'}}
            onClick={() => setShowMetricasCobros(false)}
        >
            <i className="fa-solid fa-circle-xmark"></i>
        </button>
            </div>

            </div>
                <div className="shadow p-6 border rounded-2xl">
                <div className="text-lg bg-gray-200 font-bold mb-2 grid grid-cols-10 gap-4 border p-2 rounded-lg shadow-md">            
                <div className="col-span-2">
                    <label>Fecha Inicio: </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="p-2 border rounded"
                    />
                    </div>
                    <div className="col-span-2">
                    <label className="">Fecha Fin: </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="p-2 border rounded"
                    />
                </div>
                                    {/* Filtros de ID Propietario y Conductor */}
                                    <div className="col-span-3">
                        <label>Propietario: </label>
                        <select
                            value={idPropietario}
                            onChange={(e) => setIdPropietario(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            {propietarios.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3">
                        <label>Conductor: </label>
                        <select
                            value={idConductor}
                            onChange={(e) => setIdConductor(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos</option>
                            {conductores.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    </div>

                {/* Filtros de variables a mostrar */}
                <div>
                    <div className="flex font-bold text-lg gap-4">
                        <div className="text-lg font-bold ">
                        <p>Filtrar Variables: </p>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="cobro"
                                checked={selectedVariables.includes('cobro')}
                                onChange={handleVariableChange}
                            />
                            <label className="ml-2">Cobros</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="saldo"
                                checked={selectedVariables.includes('saldo')}
                                onChange={handleVariableChange}
                            />
                            <label className="ml-2">Saldo</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="renta"
                                checked={selectedVariables.includes('renta')}
                                onChange={handleVariableChange}
                            />
                            <label className="ml-2">Renta</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                value="deuda"
                                checked={selectedVariables.includes('deuda')}
                                onChange={handleVariableChange}
                            />
                            <label className="ml-2">Deuda</label>
                        </div>
                    </div>
                </div>

                {/* Gráfico */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <Line data={weekData} options={options} />
                </div>
            </div>
        </div>
        </>
    );
};

export default MetricaCobros;
